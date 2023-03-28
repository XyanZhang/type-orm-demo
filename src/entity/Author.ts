import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // 一个作者可以有多个照片
  @OneToMany(() => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
  photos: Photo[]
}