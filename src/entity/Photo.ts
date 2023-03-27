import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity() // 创建数据库模型
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text") // 表字段：Column， text:数据库类型
    description: string

    @Column()
    filename: string

    @Column("double")
    views: number

    @Column()
    isPublished: boolean
}