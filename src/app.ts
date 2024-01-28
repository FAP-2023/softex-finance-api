import express from "express";
import { createServer } from "http";
import "dotenv/config";
import { startDatabase } from "./database/app-data-source";
import "reflect-metadata";
import * as _ from 'lodash'
import cors from "cors";
import { appRoutes } from "./utils/rotesInitializer";
import { RouteInit } from "./utils/IRouteInit";

class App{
  private expressApp: express.Application;
  private port: number;
  private server: any;

  constructor(port: number) {
    this.expressApp = express();
    this.configureApp();
    this.port = port;
    this.server = createServer(this.expressApp);
  }

  startServer(){
    try {
      this.server.listen(this.port, () => {
        console.log("Servidor rodando na porta", this.port);
      })
    } catch (error:any) {
      console.log(error.message)
    }
  }

  async startDatabase(){
    try {
      startDatabase();
    } catch (error:any) {
      console.log(error.message)
    }
  }

  configureApp(){
    try {
      this.expressApp.use(express.json());
      this.expressApp.use(cors());
      this.expressApp.use(express.urlencoded({ extended: true }));
    } catch (error:any) {
      console.log(error.message)
    }
  }

  configureRoutes(){
    try {
      _.forEach(appRoutes, (element:RouteInit) => {
        console.log("Configurando rotas para", element.path)
        this.expressApp.use(element.path, element.routes);
      })
    } catch (error:any) {
      console.log(error.message)
    }
  }
}

const app = new App(3000);
app.configureApp();
app.configureRoutes();
app.startServer();
app.startDatabase();
