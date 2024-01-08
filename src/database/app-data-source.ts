import { DataSource } from "typeorm";
import { User } from "../entites/user.entity";
import { Transaction } from "../entites/transaction.entity";
import 'reflect-metadata'
import { Customer } from "../entites/Customer.entity";
import { FaqItem } from "../entites/faqitem.entity";
import { Product } from "../entites/product.entity";

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_DIALECT as any,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as any,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Transaction, Customer, FaqItem, Product],
  synchronize: true,
});

export async function startDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Database conectado");
  } catch (error) {
    console.error(error, "Erro initialing database");
    throw error;
  }
}

