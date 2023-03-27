import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class UserExtend extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    async saveUser(): Promise<void> {
        await this.save();
    }

    async removeUser(): Promise<void> {
        await this.remove();
    }
}