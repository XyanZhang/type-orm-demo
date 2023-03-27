# typeorm doc

## getRepository

getRepository是TypeORM提供的一个方法，用于获取指定实体类的数据库操作对象。它的用法如下：

```typescript
import { getRepository } from "typeorm";
import { User } from "./entities/User";

const userRepository = getRepository(User);
```

在这个例子中，我们使用getRepository方法获取了User实体类的数据库操作对象userRepository。通过userRepository，我们可以进行一些常见的数据库操作，如保存、查询、删除等。

getRepository方法接受一个参数，即实体类。该参数可以是实体类的类名，也可以是实体类的实例。在上面的例子中，我们传递了User实体类作为参数，因此userRepository对象可以用来操作User实体类对应的数据库表。

getRepository方法返回的对象包含了一些常用的数据库操作方法，如：

```ts
save(entity: Entity): Promise<Entity>：保存实体类对象到数据库。
remove(entity: Entity): Promise<Entity>：从数据库中删除实体类对象。
findOne(id: string|number|Date|ObjectID, options?: FindOneOptions<Entity>): Promise<Entity|undefined>：根据ID或其他条件查询单个实体类对象。
find(options?: FindManyOptions<Entity>): Promise<Entity[]>：查询符合条件的多个实体类对象。
delete(criteria: string|number|Date|ObjectID|any[]): Promise<DeleteResult>：根据ID或其他条件删除实体类对象。
```

除了以上列出的方法，还有很多其他有用的方法可以在getRepository返回的对象上调用。你可以查阅TypeORM的文档来了解更多信息。

总之，getRepository方法是TypeORM中非常实用的一个方法，它可以让我们方便地获取指定实体类的数据库操作对象，并进行常见的数据库操作。
