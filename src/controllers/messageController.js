import Message from "../models/message.js";

class MessageController {
  static AddMessage(req, res) {
    try {
      const { _id } = req.body;

      if (!_id) {
        const message = new Message({ ...req.body });
        message.save(err => {
          if (err)
            res.status(500).send({
              message: `erro: ${err.message}, falha ao cadastrar Recado`,
            });
          else
            res
              .status(200)
              .send({ message: "Recado cadastrada com sucesso", message });
        });
      } else {
        Message.findByIdAndUpdate({ _id }, { ...req.body }, (err, doc) => {
          if (!err)
            res.status(200).send({
              message: "Recado atualizada com sucesso",
              response: doc,
            });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static ListMessages(_, res) {
    try {
      Message.find({}, (err, docs) => {
        if (!err) res.status(200).send(docs);
        else res.status(500).send({ message: `erro: ${err.message}` });
      });
    } catch (error) {
      throw error;
    }
  }

  static DeleteMessage(req, res) {
    try {
      const { id } = req.params;
      Message.findByIdAndDelete(id, (err, doc) => {
        if (err)
          res
            .status(500)
            .send({ message: `erro: ${err.message}, falha ao deletar recado` });
        else
          res
            .status(200)
            .send({ message: "recado deletado com sucesso", response: doc });
      });
    } catch (error) {
      throw error;
    }
  }
}

export default MessageController;
