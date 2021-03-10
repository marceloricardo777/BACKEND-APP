import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Card } from './Card';
import { ImageProduct } from './ImageProduct';
import { VariationProduct } from './VariationProduct';
@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    name?: string;

    @Column({ nullable: true })
    category?: string;

    @CreateDateColumn({ nullable: true, select: false })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true, select: false })
    updateAt?: Date
    @OneToMany(() => ImageProduct, (imageproduct) => imageproduct.product, { cascade: true, eager: true })
    @JoinColumn()
    imageproducts?: Promise<ImageProduct[]>
    @OneToMany(() => VariationProduct, (variationproduct) => variationproduct.product, { cascade: true })
    @JoinColumn()
    variationproduct?: Promise<VariationProduct[]>
    @OneToMany(() => Card, (card) => card.product, { cascade: true })
    card?: Promise<Card[]>
}
