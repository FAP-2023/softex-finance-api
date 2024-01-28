import { authRoutes } from "../routes/auth.route"
import { customersRoutes } from "../routes/customers.route"
import { ProductsRoutes } from "../routes/products.route"
import { TransactionsRoutes } from "../routes/transactions.route"
import { UserRoutes } from "../routes/user.route"
import { RouteInit } from "./IRouteInit"

export const appRoutes:RouteInit[] = [
    {
        path: "/users",
        routes: UserRoutes()
    },
    {
        path: "/auth",
        routes: authRoutes()
    },
    {
        path: "/products",
        routes: ProductsRoutes()
    },
    {
        path: "/customers",
        routes: customersRoutes()
    },
    {
        path: "/transactions",
        routes: TransactionsRoutes()
    },
]