import { DataSource } from "typeorm"

console.log(process.env.DATABASE_PASSWORD, "process.env.DATABASE_PASSWORD");
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [],
    synchronize: true,
});

export async function startDatabase() {
    try {
        await AppDataSource.initialize();
    } catch (error) {
        console.error(error, "Erro initialing database");
        throw error;
    }
}