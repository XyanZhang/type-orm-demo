import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity() // 表示该类是一个实体类，对应数据库中的一张表。
export class User {
    @PrimaryGeneratedColumn() // 表示该属性为主键，并自动生成唯一的数字值。
    id: number

    @Column() // 表示该属性对应数据库表中的一个列, 不带参数时默认使用属性名作为列名
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}