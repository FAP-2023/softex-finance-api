import express from "express";
import { createServer } from "http";
import "dotenv/config";
import { startDatabase } from "./database/app-data-source";
import "reflect-metadata";
import { UserRoutes } from "./routes/user.route";
import { authRoutes } from "./routes/auth.route";
import { ProductsRoutes } from "./routes/products.route";
import { customersRoutes } from "./routes/customers.route";
import { TransactionsRoutes } from "./routes/transactions.route";

async function startApp() {
	try {
		const app = express();
		app.use(express.json());

		//configurando rotas
		app.use('/*', (req, res, next) => res.sendStatus(404))
		app.use("/users", UserRoutes());
		app.use("/auth/", authRoutes());
		app.use("/products", ProductsRoutes());
		app.use("/customers", customersRoutes());
		app.use("/transactions", TransactionsRoutes())
		//--------------------

		app.use(express.urlencoded({ extended: true }));
		const server = createServer(app);
		server.listen(process.env.PORT, () => {
			console.log("Servidor rodando na porta", process.env.PORT);
		});
		await startDatabase();
	} catch (error) {
		console.log(error);
	}
}
startApp();
