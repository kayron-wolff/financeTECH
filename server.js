import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import routerTasks from './routers/routerTasks.js'
import cors from 'cors';

const app = express();
app.use(cors());

dotenv.config();

app.use(express.static('views'));
app.use(express.json());

app.use('/home', routerTasks);

app.get('/', (req, res)=>{
    res.send('Connection Set with views/index.html', {root: '.'});
});

const server = http.createServer(app);
server.listen(process.env.PORT, ()=>{
    console.log(`Server running over port: http//localhost:${process.env.PORT}`);
});