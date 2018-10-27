import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity()
export class MovieEntity extends BaseEntity {
  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'jsonb', default: {} })
  extraData: object;

  @OneToMany(type => CommentEntity, comment => comment.movie)
  comments: CommentEntity[];
}
