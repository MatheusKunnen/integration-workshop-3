import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './src/routes/routes.js';
import parentsRoutes from './src/routes/parents.routes.js';
import db from './src/database/database_config.js';
import childrenRoutes from './src/routes/children.routes.js';
import auxiliarRoutes from './src/routes/auxiliar.routes.js';
import swagger from 'swagger-ui-express';
import docs from './src/docs/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('short'));
app.use('/api-docs', swagger.serve, swagger.setup(docs));
app.use('/image', express.static('images'));
app.use('/parents', parentsRoutes);
app.use('/children', childrenRoutes);
app.use(routes);
app.use(auxiliarRoutes); // For debug and help to test the system

db.sync()
  .then(() => {
    console.log('Tabelas criadas no banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
  });

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
