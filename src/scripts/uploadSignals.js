import mongoose from "mongoose";
import { Client } from "ssh2";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  "mongodb+srv://admin:prtc2010rs@heatmap.oy7rqgq.mongodb.net/users"
);

import Ramal from "../models/ramaisOlt.js";
import RamalLog from "../models/ramalModel.js";

async function getRamais() {
  try {
    return await Ramal.find().sort({ _id: -1 }).exec();
  } catch (error) {
    console.error("Erro ao listar ramais:", error);
  }
}

async function isExecutionNeeded() {
  try {
    const today = new Date().toISOString().split("T")[0]; // Pega a data atual no formato "YYYY-MM-DD"
    const lastLog = await RamalLog.findOne().sort({ date_time: -1 }).exec();

    if (lastLog) {
      const lastLogDate = new Date(lastLog.date_time)
        .toISOString()
        .split("T")[0];

      return lastLogDate !== today; // Só executa se não houver log de hoje
    }
    
    return true; // Se não houver logs, executa
  } catch (error) {
    console.error("Erro ao verificar logs existentes:", error);
    return true; // Em caso de erro, evita bloquear a execução
  }
}

function SaveRamalLog(logData) {
  const newLog = new RamalLog(logData);
  newLog.save((err) => {
    if (err) {
      console.error(`${err.message} - falha ao cadastrar Logs`);
    }
  });
}

function calculateAverages(data) {
  if (data.length === 0) return { avgTx: null, avgRx: null };

  const totalTx = data.reduce((sum, item) => sum + item.tx, 0);
  const totalRx = data.reduce((sum, item) => sum + item.rx, 0);

  return {
    tx: parseFloat((totalTx / data.length).toFixed(2)),
    rx: parseFloat((totalRx / data.length).toFixed(2)),
  };
}

function VerificarSinalPon(oltIp, oltPon) {
  return new Promise((resolve, reject) => {
    const username = process.env.PARKS_USERNAME;
    const password = `#${process.env.PARKS_PASSWORD}`;
    const conn = new Client();

    conn
      .on("ready", () => {
        conn.shell((err, stream) => {
          if (err) {
            reject(err);
            return;
          }

          let dataBuffer = "";
          let jsonOutput = null;

          stream
            .on("close", () => {
              conn.end();
              resolve(jsonOutput);
            })
            .on("data", (data) => {
              dataBuffer += data.toString();
              if (dataBuffer.includes("\n")) {
                const items = [];
                const lines = dataBuffer.split("\n");

                for (let i = 0; i < lines.length; i++) {
                  const trimmedLine = lines[i]?.trim();

                  if (trimmedLine && !isNaN(parseInt(trimmedLine.charAt(0)))) {
                    const alias = trimmedLine.split(" ")[0];
                    const statusMatch = lines[i + 1]?.match(/Status\s*:\s*(.*)/);
                    const txMatch = lines[i + 2]?.match(
                      /Power Level\s*:\s*(-?\d+\.\d+)/
                    );
                    const rxMatch = lines[i + 3]?.match(
                      /RSSI\s*:\s*(-?\d+\.\d+)/
                    );

                    if (statusMatch && txMatch && rxMatch) {
                      items.push({
                        alias,
                        status: statusMatch[1],
                        tx: parseFloat(txMatch[1]),
                        rx: parseFloat(rxMatch[1]),
                      });
                    }

                    i += 3;
                  }
                }
                jsonOutput = items;
              }
            });

          stream.write("terminal length 0\n");
          stream.write(`sh interface ${oltPon} onu status\n`);
          stream.write("exit\n");
        });
      })
      .on("error", reject)
      .connect({ host: oltIp, port: 22, username, password });
  });
}

async function savePongSignals() {
  if (!(await isExecutionNeeded())) {
    console.log("Execução ignorada, já há registros para hoje.");
    return;
  }

  const ramais = await getRamais();
  console.log("Cadastro de sinais iniciado");

  for (const ramal of ramais) {
    const { oltIp, oltPon, _id } = ramal;
    const ponSignal = await VerificarSinalPon(oltIp, oltPon);

    if (ponSignal.length > 0) {
      SaveRamalLog({
        id: _id.toString(),
        date_time: new Date().toISOString(), // Salva em formato ISO
        gpon_data: ponSignal,
        avgSignal: calculateAverages(ponSignal),
      });
    }
  }

  console.log("Sinais cadastrados com sucesso.");
}

export default function startUpdateLoop() {
  savePongSignals();

  setInterval(async () => {
    await savePongSignals();
  }, 86400000);
}
