import "reflect-metadata"
import { DataSource } from "typeorm"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoMetadata"
import { User } from "./entity/User"
import { Author } from './entity/Author';
import { Album } from "./entity/Album"

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
    entities: [User, Photo, PhotoMetadata, Author, Album], // 根据实体创建数据表
})
