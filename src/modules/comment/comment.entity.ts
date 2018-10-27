import { Column, ManyToOne, Entity } from 'typeorm';
import { MovieEntity } from '../movie/movie.entity';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @Column({ length: 500, nullable: false })
  body: string;

  // HACK: Simplify access to this property
  @Column({ nullable: true })
  movieId: number;

  @ManyToOne(type => MovieEntity, movie => movie.comments, {})
  movie: MovieEntity;
}
