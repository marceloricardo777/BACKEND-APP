import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    name?: string;

    @Column({ nullable: true })
    whatsapp?: string

    @CreateDateColumn({ nullable: true })
    createdAt?: Date

    @UpdateDateColumn({ nullable: true })
    updateAt?: Date
    @OneToOne(() => User, (user) => user.client)
    user?: User;


}
