import express from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'

dotenv.config()

function startApp(){
    try {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({extended:true}))
        const server = createServer(app);
        server.listen(process.env.PORT, () => {
            console.log('Servidor rodando na porta', process.env.PORT)
        })
    } catch (error) {
        console.log(error)
    }
}

export const app = express();

app.use(express.json())

export async function startWebServer() {
    return new Promise((resolve, reject) => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
            resolve(null);
        });
    });
}

startApp();





