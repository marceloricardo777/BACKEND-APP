import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Client } from '../Client';
import { User } from '../User';
import { Product } from './Product';
import { VariationProduct } from './VariationProduct';
@Entity()
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ nullable: true })
    quantity?: number;

    @CreateDateColumn({ nullable: true, select: false })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true, select: false })
    updateAt?: Date

    @ManyToOne(() => Product, (product) => product.card, { eager: true })
    @JoinColumn()
    product?: Product;

    @ManyToOne(() => VariationProduct, (variationproduct) => variationproduct.card, { cascade: true, eager: true })
    @JoinColumn()
    variationproduct?: Promise<VariationProduct[]>

    @OneToOne(() => User, (user) => user.card)
    @JoinColumn()
    user?: User;
}
