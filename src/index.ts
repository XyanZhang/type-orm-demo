import { AppDataSource } from "./data-source"
import { Photo } from "./entity/Photo"
import { User } from "./entity/User"
import { UserExtend } from './entity/UserExtend'

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

// TODO: 有错误
let getUsers = async () => {
    await AppDataSource.initialize();
    const user = new UserExtend()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await user.saveUser()

    const allUsers = await UserExtend.find()
    console.log(allUsers)
}
// getUsers()



let addPhoto = async () => {
    await AppDataSource.initialize(); // 初始化链接
    
    const photo = new Photo()
    photo.name = "Me and Bears"
    photo.description = "I am near polar bears"
    photo.filename = "photo-with-bears.jpg"
    photo.views = 1
    photo.isPublished = true

    // 保存进数据库
    await AppDataSource.manager.save(photo)
    console.log("Photo has been saved. Photo id is", photo.id)

    // 操作数据库数据
    const savedPhotos = await AppDataSource.manager.find(Photo)
    console.log("All photos from the db: ", savedPhotos)
}
addPhoto()
