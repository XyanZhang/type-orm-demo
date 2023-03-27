import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int")
  height: number

  @Column("int")
  width: number

  @Column()
  orientation: string

  @Column()
  compressed: boolean

  @Column()
  comment: string

  // 关联 一对一
  // @OneToOne(() => Photo) // 关联Photo，这种关系只会在 PhotoMetadata 显示 Photo
  @OneToOne(() => Photo, (photo) => photo.metadata) // 双向关联
  @JoinColumn() // 这表明关系的这一边将拥有该关系
  photo: Relation<Photo>
}