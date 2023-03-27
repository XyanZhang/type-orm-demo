import "reflect-metadata"
import { DataSource } from "typeorm"
import { Photo } from "./entity/Photo"
import { User } from "./entity/User"
import { UserExtend } from "./entity/UserExtend"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "3r",
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations: [],
    entities: [User, Photo],
})
