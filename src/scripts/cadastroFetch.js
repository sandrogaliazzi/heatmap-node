import newFetchModel from "../models/newetchWithPppoe.js";
import { newFetchTomodat } from "../scripts/fetchApiTomodat.js";
import db from "../config/dbConnect.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => {
  let now = new Date().toLocaleString("PT-br");
  console.log(`conexão com o banco em: ${now}`);
});

async function cadastroFetch() {
  try {
    const data = await newFetchTomodat();

    await Promise.all(
      data.map(async element => {
        // Verificar se o item já existe no banco (exemplo usando Mongoose)
        const existingItem = await newFetchModel.findOne({ id: element.id });

        if (!existingItem) {
          const fet = new newFetchModel(element);
          await fet.save();
        }
      })
    );

    console.log(
      `fetch totalmente cadastrado com sucesso em: ${new Date().toLocaleString(
        "PT-br"
      )}`
    );
  } catch (err) {
    console.error(`Erro ao cadastrar: ${err.message}`);
  }
}

setInterval(cadastroFetch, 21600000); // realiza o cadastro de novos elementos no banco
