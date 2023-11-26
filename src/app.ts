import express from 'express'
import { createServer } from 'http'
import 'dotenv/config'
import { startDatabase } from './services/database/app-data-source';
import "reflect-metadata"

async function startApp(){
    try {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({extended:true}))
        const server = createServer(app);
        server.listen(process.env.PORT, () => {
            console.log('Servidor rodando na porta', process.env.PORT)
        })
        await startDatabase()
    } catch (error) {
        console.log(error)
    }
}
startApp();





