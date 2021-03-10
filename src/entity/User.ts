import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client";
import { Card } from "./entity_product/Card";
//import { RecoverPassword } from './RecoverPassword';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    email?: string;

    @Column({ select: false })
    password?: string;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true })
    updateAt?: Date;



    @OneToOne(() => Client, (client) => client.user, { cascade: true })
    @JoinColumn()

    client?: Client;
    // @OneToMany((type) => RecoverPassword, (recoverpassword) => recoverpassword.user)
    // recoverpassword: Promise<RecoverPassword[]>

    @OneToOne(() => Card, (card) => card.user, { cascade: true, eager: true })
    card?: Card;
}