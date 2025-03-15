import knex from "../mkDatabase/index.js";

class OsController {
  static listarOsReagendar = (req, res, next) => {
    try {
      knex("mk_os")
        .select(
          "codos AS Código os",
          knex.raw(
            "COALESCE(dt_hr_fechamento_tec, dt_hr_fechamento) AS data_referencia"
          ),
          "mk_pessoas.nome_razaosocial",
          "servico_prestado"
        )
        .join("mk_pessoas", "mk_os.cliente", "=", "mk_pessoas.codpessoa")
        .where("classificacao_encerramento", 5)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  static listarOsAtrasados = (req, res, next) => {
    try {
      knex("mk_compromissos")
        .select(
          "com_inicio",
          "codos",
          "com_titulo",
          "usuario.usr_nome AS TECNICO",
          "descricao"
        )
        .join(
          "mk_colaboradores AS colaborador",
          "cd_funcionario",
          "=",
          "colaborador.codcolaborador"
        )
        .join(
          "fr_usuario AS usuario",
          "usuario.usr_codigo",
          "=",
          "colaborador.usr_codigo"
        )
        .join("mk_os", "codos", "=", "cd_integracao")
        .join("mk_os_tipo", "tipo_os", "=", "codostipo")
        .where("com_inicio", "<", knex.raw("CURRENT_DATE"))
        .andWhere("encerrado", "N")
        .orderBy("com_inicio", "asc")
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      console.log("Erro ao capturar os atrasadas " + error);
    }
  };

  static listarOsNaoResolvidas = (req, res, next) => {
    try {
      knex("mk_os")
        .select(
          'codos AS "Código os"',
          "dt_hr_fechamento",
          "nome_razaosocial",
          "servico_prestado"
        )
        .join("mk_pessoas", "codpessoa", "=", "cliente")
        .where("classificacao_encerramento", 6)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      console.log("Erro ao capturar os não resolvidas " + error);
    }
  };

  static listarOsNaoAgendada = (req, res, next) => {
    try {
      knex("mk_os AS os")
        .select(
          "os.codos",
          knex.raw("os.data_abertura::date AS data_abertura"),
          "pessoa.nome_razaosocial AS cliente",
          "tipo_os.descricao AS tipo_os"
        )
        .join("mk_pessoas AS pessoa", "os.cliente", "=", "pessoa.codpessoa")
        .join("mk_os_tipo AS tipo_os", "os.tipo_os", "=", "tipo_os.codostipo")
        .where("os.status", 1)
        .andWhere("tipo_os.codostipo", "!=", 16)
        .andWhere("os.encerrado", "N")
        .orderBy("os.codos", "desc")
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      console.log("Erro ao capturar os não agendadas " + error);
    }
  };

  static listarRetiradasDeConector = (req, res, next) => {
    const cto = req.params.cto;
    let city = "";

    switch (req.params.city) {
      case "M. PEDRA":
        city = ["Parobé", "Taquara"];
        break;
      case "FAZ. FIALHO":
        city = ["Taquara", "Gravataí"];
        break;
      case "SÃO JOÃO DO DESERTO":
        city = ["Gravataí", "Novo Hamburgo"];
        break;
      case "SAPIRANGA":
        city = ["Sapiranga"];
        break;
      case "ARARICA":
        city = ["Araricá"];
        break;
      case "IGREJINHA":
        city = ["Igrejinha"];
        break;
      case "NOVA HARTZ":
        city = ["Nova Hartz"];
        break;
      case "PAROBE":
        city = ["Parobé"];
        break;
      case "TRES COROAS":
        city = ["Três Coroas"];
        break;
    }

    try {
      knex("mk_os")
        .select(
          "codos",
          "data_abertura",
          "nome_razaosocial",
          "defeito_reclamado",
          "cidade"
        )
        .join("mk_pessoas", "cliente", "=", "codpessoa")
        .join("mk_cidades", "cd_cidade", "=", "mk_cidades.codcidade")
        .where("encerrado", "N")
        .andWhere("status", 1)
        .andWhere(function () {
          this.where("tipo_os", 16).orWhere("tipo_os", 31);
        })
        .andWhere("defeito_reclamado", "like", `%${cto}%`)
        .andWhere("cidade", "in", city)
        .orderBy("codos", "desc")
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      console.log("Erro ao capturar retiradas de conector " + error);
    }
  };

  static listarPercursoTecnico(req, res) {
    const tecnico = req.params.id;
    try {
      knex("mk_compromissos as c")
        .join("mk_os as o", "c.cd_integracao", "o.codos")
        .join("mk_cidades", "codcidade", "cd_cidade")
        .join("mk_bairros", "codbairro", "cd_bairro")
        .join("mk_logradouros", "codlogradouro", "cd_logradouro")
        .select(
          "c.cd_funcionario",
          "mk_cidades.cidade",
          "mk_bairros.bairro",
          "mk_logradouros.logradouro",
          "o.encerrado",
          "c.com_titulo",
          "c.com_descricao",
          "o.servico_prestado"
        )
        .where(
          knex.raw(
            `com_inicio AT TIME ZONE 'America/Sao_Paulo' >= current_date`
          )
        )
        .andWhere(
          knex.raw(
            `com_inicio AT TIME ZONE 'America/Sao_Paulo' < current_date + INTERVAL '1 day'`
          )
        )
        .andWhere("c.cd_funcionario", tecnico)
        .groupBy(
          "c.cd_funcionario",
          "mk_cidades.cidade",
          "mk_bairros.bairro",
          "mk_logradouros.logradouro",
          "o.encerrado",
          "c.com_titulo",
          "c.com_descricao",
          "o.servico_prestado"
        )
        .orderBy("c.cd_funcionario")
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      console.log("Erro ao capturar percurso por técnico " + err);
    }
  }
}

export default OsController;
