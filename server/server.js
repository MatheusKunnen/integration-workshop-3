import express from "express";
import routes from "./routes.js";
import db from "./src/database.js";

const app = express();

app.use(express.json());
app.use(routes);

db.sync()
    .then(() => {
        console.log('Tabelas criadas no banco de dados');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabelas:', error);
    });

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));

