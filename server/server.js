import express from "express";
import routes from "./src/routes/routes.js";
import parentsRoutes from "./src/routes/parents.routes.js";
import db from "./src/database/database_config.js";
import childrenRoutes from "./src/routes/children.routes.js";

const app = express();

app.use(express.json());
app.use("/parents", parentsRoutes);
app.use("/children", childrenRoutes);
app.use(routes);
app.use('/image', express.static('images'));

db.sync()
    .then(() => {
        console.log('Tabelas criadas no banco de dados');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabelas:', error);
    });

app.listen(process.env.PORT, () => console.log("Servidor iniciado na porta 3000"));

