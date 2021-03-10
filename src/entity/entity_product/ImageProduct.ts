import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';
@Entity()
export class ImageProduct extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    path?: string;

    @CreateDateColumn({ nullable: true, select: false })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true, select: false })
    updateAt?: Date
    @ManyToOne(() => Product, (product) => product.imageproducts)
    @JoinColumn()
    product?: Product;

}
