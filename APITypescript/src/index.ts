import express =  require('express');
import morgan from 'morgan';
import personalRoutes from './routes/personalRoutes';
import clientesRoutes from './routes/clientesRoutes';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/personal',personalRoutes);
app.use('/api/clientes',clientesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT} http://localhost:${PORT}/`);
});