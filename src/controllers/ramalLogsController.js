import ramalLogs from "../models/ramalModel.js";

class RamalLogsController {
  static SaveRamalLog = (req, res) => {
    console.log("chegou aqui");
    const newLog = new ramalLogs(req.body);
    newLog.save(err => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar Logs` });
      } else {
        res.status(200).send({ message: "Log cadastrado com sucesso" });
      }
    });
  };
  static FindRamalLogs = (req, res) => {
    const id = req.params.id;
    ramalLogs.find({ id }, (err, docs) => {
      if (docs) {
        res.status(200).send({ ramalHistory: docs });
      } else {
        res.status(500).send({ message: "Nenhum log registrado" });
      }
    });
  };
}

export default RamalLogsController;