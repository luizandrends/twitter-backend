import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tokens_blacklist')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export default UserToken;
