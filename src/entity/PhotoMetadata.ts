import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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
  @OneToOne(() => Photo)
  @JoinColumn() // 这表明关系的这一边将拥有该关系
  photo: Photo
}