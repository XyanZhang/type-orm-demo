import { Entity, Column, PrimaryGeneratedColumn, OneToOne, Relation } from "typeorm"
import { PhotoMetadata } from "./PhotoMetadata"

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

    // @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo) // 会导致循环引用
    // metadata: PhotoMetadata

    // 解决循环引用
    @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
        cascade: true, // 简单地保存一个照片对象，并且元数据对象会因为级联选项而自动保存
    })
    metadata: Relation<PhotoMetadata>
}