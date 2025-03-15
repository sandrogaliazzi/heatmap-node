import Metric from "../models/metricModel.js";
import Sale from "../models/salesModel.js";

class SalesController {
  static async AddOrUpdateMetrics(req, res) {
    const { _id } = req.body;
    try {
      // Procura o documento de vendas pelo ID
      let metric = await Metric.findById(_id);

      // Se o documento não existe, cria um novo objeto Sales
      if (!metric) {
        metric = new Metric({ ...req.body });

        metric.save(err => {
          if (err) {
            res
              .status(500)
              .send({ message: `${err.message} - falha ao cadastrar métrica` });
          } else {
            res
              .status(200)
              .send({ message: `Métrica cadastrada com sucesso.` });
          }
        });
      } else {
        // Se já existir, atualiza as metas de vendas existentes ou adiciona uma nova
        Metric.findByIdAndUpdate(_id, { ...req.body }, (err, _) => {
          if (!err)
            res.status(200).send({ message: "Métrica atualizada com sucesso" });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static AddSale(req, res) {
    try {
      const { _id } = req.body;

      if (!_id) {
        const sale = new Sale({ ...req.body });
        sale.save(err => {
          if (err)
            res.status(500).send({
              message: `erro: ${err.message}, falha ao cadastrar venda`,
            });
          else
            res
              .status(200)
              .send({ message: "Venda cadastrada com sucesso", sale });
        });
      } else {
        Sale.findByIdAndUpdate({ _id }, { ...req.body }, (err, doc) => {
          if (!err)
            res
              .status(200)
              .send({ message: "Venda atualizada com sucess", sale: doc });
        });
      }
    } catch (error) {
      throw error;
    }
  }

  static DeleteSale(req, res) {
    try {
      const { id } = req.params;
      Sale.findByIdAndDelete(id, (err, doc) => {
        if (err)
          res
            .status(500)
            .send({ message: `erro: ${err.message}, falha ao deletar venda` });
        else
          res
            .status(200)
            .send({ message: "venda deletada com sucesso", sale: doc });
      });
    } catch (error) {
      throw error;
    }
  }

  static ListMetrics(_, res) {
    try {
      Metric.find({}, (err, docs) => {
        if (!err) res.status(200).send(docs);
        else res.status(500).send({ message: `erro: ${err.message}` });
      });
    } catch (error) {
      throw error;
    }
  }

  static ListSales(req, res) {
    const { metricRef, weekRef } = req.body;
    const today = new Date().toLocaleDateString();
    const [day, month, year] = today.split("/");
    const date = `${year}-${month}-${day}`;
    try {
      Sale.find({ metricId: metricRef }, (err, docs) => {
        if (!err) {
          const response = {
            sales: docs,
            weekSales: docs.filter(sale => sale.weekNumber == weekRef),
            dailySales: docs.filter(sale => sale.date == date),
          };

          res.status(200).send(response);
        } else {
          res.status(500).send({ message: `erro: ${err.message}` });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static ListSalesBySeller(req, res) {
    let { seller } = req.params;
    try {
      Sale.find({ seller }, (err, docs) => {
        if (!err) res.status(200).send(docs);
        else res.status(500).send({ message: `erro: ${err.message}` });
      });
    } catch (error) {
      throw error;
    }
  }

  static ListSalesBySellerAndCity(req, res) {
    let { seller, city } = req.params;
    try {
      Sale.find({ seller, city }, (err, docs) => {
        if (!err) res.status(200).send(docs);
        else res.status(500).send({ message: `erro: ${err.message}` });
      });
    } catch (error) {
      throw error;
    }
  }

  static ListAllSales(_, res) {
    try {
      Sale.find({}, (err, docs) => {
        if (!err) res.status(200).send(docs);
        else res.status(500).send({ message: `erro: ${err.message}` });
      });
    } catch (error) {
      throw error;
    }
  }
}

export default SalesController;
