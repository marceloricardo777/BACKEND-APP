import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class UsersAdmin {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    email?: string;

    @Column()
    fullName?: string;

    @Column({ default: 1 })
    level?: number;

    @Column({ select: false })
    password?: string;

    @Column({ nullable: true, default: true })
    active?: boolean;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true })
    updateAt?: Date;



}