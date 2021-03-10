import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn, CreateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Card } from './Card';
import { Product } from './Product';
@Entity()
export class VariationProduct extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    size?: string;

    @Column()
    color?: string;

    @Column({ nullable: true, default: 0.00, type: "float" })
    price?: number;
    @Column({ nullable: true, default: 0.00, type: "int" })
    stock?: number;


    @CreateDateColumn({ nullable: true, select: false })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true, select: false })
    updateAt?: Date
    @ManyToOne(() => Product, (product) => product.variationproduct)
    @JoinColumn()
    product?: Product;
    @OneToMany(() => Card, (card) => card.product)
    @JoinColumn()
    card?: Promise<Card[]>



}
