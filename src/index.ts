import { AppDataSource } from './data-source';
import { Album } from './entity/Album';
import { Photo } from './entity/Photo';
import { PhotoMetadata } from './entity/PhotoMetadata';
import { User } from './entity/User';
import { UserExtend } from './entity/UserExtend';

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
  const user = new UserExtend();
  user.firstName = 'Timber';
  user.lastName = 'Saw';
  user.age = 25;
  await user.saveUser();

  const allUsers = await UserExtend.find();
  console.log(allUsers);
};
// getUsers()

// 增
let addPhoto = async () => {
  const photo = new Photo();
  photo.name = 'Me and Bears';
  photo.description = 'I am near polar bears';
  photo.filename = 'photo-with-bears.jpg';
  photo.views = 1;
  photo.isPublished = true;

  // 保存进数据库
  await AppDataSource.manager.save(photo);
  console.log('Photo has been saved. Photo id is', photo.id);

  // 操作数据库数据
  const savedPhotos = await AppDataSource.manager.find(Photo);
  console.log('All photos from the db: ', savedPhotos);
};
// 查询
let useRepo = async () => {
  const photoRepository = AppDataSource.getRepository(Photo);
  const allPhotos = await photoRepository.find();
  console.log('All photos from the db: ', allPhotos);

  const firstPhoto = await photoRepository.findOneBy({
    id: 1,
  });
  console.log('First photo from the db: ', firstPhoto);

  const meAndBearsPhoto = await photoRepository.findOneBy({
    name: 'Me and Bears',
  });
  console.log('Me and Bears photo from the db: ', meAndBearsPhoto);

  const allViewedPhotos = await photoRepository.findBy({ views: 1 });
  console.log('All viewed photos: ', allViewedPhotos);

  const allPublishedPhotos = await photoRepository.findBy({
    isPublished: true,
  });
  console.log('All published photos: ', allPublishedPhotos);

  const [photos, photosCount] = await photoRepository.findAndCount();
  console.log('All photos: ', photos);
  console.log('Photos count: ', photosCount);
};

// 改
let updateData = async () => {
  const photoRepository = AppDataSource.getRepository(Photo);
  const photoToUpdate = await photoRepository.findOneBy({
    id: 1,
  });
  photoToUpdate.name = 'Me, my friends and polar bears';
  await photoRepository.save(photoToUpdate);
};
// 删
let removeData = async () => {
  const photoRepository = AppDataSource.getRepository(Photo);
  const photoToRemove = await photoRepository.findOneBy({
    id: 1,
  });
  await photoRepository.remove(photoToRemove);
};

let oneToOne = async () => {
  // create a photo
  const photo = new Photo();
  photo.name = 'Me and Bears';
  photo.description = 'I am near polar bears';
  photo.filename = 'photo-with-bears.jpg';
  photo.views = 1;
  photo.isPublished = true;

  // create a photo metadata
  const metadata = new PhotoMetadata();
  metadata.height = 640;
  metadata.width = 480;
  metadata.compressed = true;
  metadata.comment = 'cybershoot';
  metadata.orientation = 'portrait';
  metadata.photo = photo; // 关联一对一

  // get entity repositories
  const photoRepository = AppDataSource.getRepository(Photo);
  const metadataRepository = AppDataSource.getRepository(PhotoMetadata);

  // first we should save a photo
  await photoRepository.save(photo);

  // photo is saved. Now we need to save a photo metadata
  await metadataRepository.save(metadata);

  // done
  console.log(
    'Metadata is saved, and the relation between metadata and photo is created in the database too',
  );
};

let getOneToOne = async () => {
  const photoRepository = AppDataSource.getRepository(Photo);
  const photos = await photoRepository.find({
    relations: {
      metadata: true,
    },
  });
  console.log(photos);
};
let complexQuery = async () => {
  const photos = await AppDataSource.getRepository(Photo)
    .createQueryBuilder('photo')
    .innerJoinAndSelect('photo.metadata', 'metadata')
    .getMany();

  console.log(photos);
};

let oneToOneCascade = async () => {
  // create photo object
  const photo = new Photo();
  photo.name = 'Me and Bears';
  photo.description = 'I am near polar bears';
  photo.filename = 'photo-with-bears.jpg';
  photo.isPublished = true;
  photo.views = 10;

  // create photo metadata object
  const metadata = new PhotoMetadata();
  metadata.height = 640;
  metadata.width = 480;
  metadata.compressed = true;
  metadata.comment = 'cybershoot';
  metadata.orientation = 'portrait';

  photo.metadata = metadata; // this way we connect them

  // get repository
  const photoRepository = AppDataSource.getRepository(Photo);

  // saving a photo also save the metadata
  await photoRepository.save(photo);

  console.log('Photo is saved, photo metadata is saved too.');
};

let manyToMany = async () => {
  // create a few albums
  const album1 = new Album();
  album1.name = 'Bears';
  await AppDataSource.manager.save(album1);

  const album2 = new Album();
  album2.name = 'Me';
  await AppDataSource.manager.save(album2);

  // create a few photos
  const photo = new Photo();
  photo.name = 'Me and Bears';
  photo.description = 'I am near polar bears';
  photo.filename = 'photo-with-bears.jpg';
  photo.views = 1;
  photo.isPublished = true;
  photo.albums = [album1, album2];
  // 保存
  await AppDataSource.manager.save(photo);
};

let queryAlbums = async () => {
  // 查询
  const loadedPhoto = await AppDataSource.getRepository(Photo).findOne({
    where: {
      id: 8,
    },
    relations: {
      albums: true,
    },
  });
  console.log(loadedPhoto);
};


let useQueryBuilder = async () => {
  const photos = await AppDataSource.getRepository(Photo)
    .createQueryBuilder(Photo, "photo") // createQueryBuilder 方法有两个参数，第一个参数是实体类的名称或实体类的构造函数，第二个参数是可选的别名
    .innerJoinAndSelect("photo.metadata", "metadata")
    .leftJoinAndSelect("photo.albums", "album")
    .where("photo.isPublished = true")
    .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
    .orderBy("photo.id", "DESC")
    .skip(5)
    .take(10)
    .setParameters({ photoName: "My", bearName: "Mishka" })
    .getMany()

  console.log(photos)
}

let operateDb = async () => {
  await AppDataSource.initialize(); // 初始化链接

  // ... 数据库操作
  // addPhoto()
  // await useRepo()
  // await updateData()
  // await oneToOne();
  // await getOneToOne();
  // await complexQuery();
  // await oneToOneCascade();
  // await manyToMany();
  // await queryAlbums();

  await useQueryBuilder();
  // 断开数据库连接
  AppDataSource.destroy();
};
operateDb();
