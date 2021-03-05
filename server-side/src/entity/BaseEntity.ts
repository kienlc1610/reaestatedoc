import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date = new Date();

  @DeleteDateColumn({ type: 'timestamp' })
  public deleteAt!: Date;
}
