const jwt = require("jsonwebtoken");

const fs = require("fs");

const SECRET = "tallerjwt";

const user = {
  confirmedUser: async (req, res) => {
    let emailUser = req.body.email;

    let objectToSave = { status: false, email: "" };

   /*  fs.writeFile(
      "archivo.json",
      JSON.stringify(objectToSave),
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    ); */

    let idUsuario = 1;
 

    const payload = {
      email: emailUser,
      id: idUsuario,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "15m" });

    const link = `http://localhost:5000/confirmuser/${idUsuario}/${token}`;

    let data = {
      link,
    };

    res.json(data);
  },

  checkUserPost: (req, res) => {
    const { email } = req.body;
    let objectToSave = { status: true, email: email };

    fs.writeFile(
      "archivo.json",
      JSON.stringify(objectToSave),
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("Archivo guardado");
      }
    );
  },
  confirmUserGet: async (req, res) => {
    const { token } = req.params;

    try {
      jwt.verify(token, SECRET);

      res.render("confirmed-user");
    } catch (error) {
      res.send("No se puede confirmar el usuario, token inválido");
    }
  },
  dataUser: (req, res) => {
    const json = require("../archivo.json");

    console.log(json)
    if (!json) {
    } else {
      res.json(json);
    }
  },
};

module.exports = user;
