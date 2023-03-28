import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // 一个相册可以有多个照片
  // 一个照片可以属于多个相册
  @ManyToMany(() => Photo, (photo) => photo.albums)
  @JoinTable()
  photos: Photo[]
}