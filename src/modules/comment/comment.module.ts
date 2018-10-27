import { CommentService } from './comment.service';
import { Module } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { MovieModule } from '../../modules/movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), MovieModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
