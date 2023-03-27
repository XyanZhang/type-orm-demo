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

// 增
let addPhoto = async () => {
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
// 查询
let useRepo = async () => {
    const photoRepository = AppDataSource.getRepository(Photo)
    const allPhotos = await photoRepository.find()
    console.log("All photos from the db: ", allPhotos)

    const firstPhoto = await photoRepository.findOneBy({
        id: 1,
    })
    console.log("First photo from the db: ", firstPhoto)

    const meAndBearsPhoto = await photoRepository.findOneBy({
        name: "Me and Bears",
    })
    console.log("Me and Bears photo from the db: ", meAndBearsPhoto)

    const allViewedPhotos = await photoRepository.findBy({ views: 1 })
    console.log("All viewed photos: ", allViewedPhotos)

    const allPublishedPhotos = await photoRepository.findBy({ isPublished: true })
    console.log("All published photos: ", allPublishedPhotos)

    const [photos, photosCount] = await photoRepository.findAndCount()
    console.log("All photos: ", photos)
    console.log("Photos count: ", photosCount)
}

// 改
let updateData = async () => {
    const photoRepository = AppDataSource.getRepository(Photo)
    const photoToUpdate = await photoRepository.findOneBy({
        id: 1,
    })
    photoToUpdate.name = "Me, my friends and polar bears"
    await photoRepository.save(photoToUpdate)
}
// 删
let removeData = async () => {
    const photoRepository = AppDataSource.getRepository(Photo)
    const photoToRemove = await photoRepository.findOneBy({
        id: 1,
    })
    await photoRepository.remove(photoToRemove)
}

let operateDb = async () => {
    await AppDataSource.initialize(); // 初始化链接

    // ... 数据库操作
    // addPhoto()
    // await useRepo()
    // await updateData()
    // 断开数据库连接
    AppDataSource.destroy()
}
operateDb() 