const express = require("express");
const router = require("./routes/routes");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
/* app.use(express.static("public")); */
app.use("/", router);
const port = 5000;
app.listen(port, () => console.log(`Servidor escuchando por el puerto ${port}!`));
