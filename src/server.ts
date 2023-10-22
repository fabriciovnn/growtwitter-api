import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { likeRoutes, tweetRoutes, usuarioRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/usuarios', usuarioRoutes());
app.use('/tweets', tweetRoutes());
app.use('/likes', likeRoutes());

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
app.get('/', (_, res) => res.status(200).json({ok: true}));