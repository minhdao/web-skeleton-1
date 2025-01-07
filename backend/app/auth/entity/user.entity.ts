import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  username!: string;

  @Column({
    type: 'varchar',
  })
  password!: string;

  @Column({
    type: 'uuid',
  })
  salt?: string;
}

export type User = typeof UserEntity.prototype;
