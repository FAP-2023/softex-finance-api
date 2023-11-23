import express from 'express'
import { createServer } from 'http'
import 'dotenv/config'

function startApp(){
    try {
        const app = express();
        const server = createServer(app);
        server.listen(process.env.PORT, () => {
            console.log('Servidor rodando na porta', process.env.PORT)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp();