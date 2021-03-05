import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsDefined } from 'class-validator';
import BaseEntity from './BaseEntity';

@Entity('items')
export class Item extends BaseEntity {
  @Column({ nullable: false })
  @IsDefined()
  name!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  type: string | null = null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  category: string | null = null;

  @Column({ type: 'int' })
  price!: number;
}
