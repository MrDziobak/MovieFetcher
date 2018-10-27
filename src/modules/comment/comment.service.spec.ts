import { CommentService } from './comment.service';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { MovieEntity } from '../movie/movie.entity';
import { MovieNotFoundException } from '../../exceptions/movie-not-found.exception';

describe('CommentService', () => {
  let commentService: CommentService;
  let commentRepository: Repository<CommentEntity>;
  let movieRepository: Repository<MovieEntity>;

  beforeEach(() => {
    commentRepository = new Repository<CommentEntity>();
    movieRepository = new Repository<MovieEntity>();

    commentService = new CommentService(commentRepository, movieRepository);
  });

  describe('findAll', () => {
    it('should query with movieId', async () => {
      const movieId = 5;

      jest.spyOn(commentRepository, 'find').mockImplementation(options => {
        expect(options.where.movieId).toEqual(movieId);
      });

      await commentService.findAll(movieId);
    });

    it('should query without movieId', async () => {
      jest.spyOn(commentRepository, 'find').mockImplementation(options => {
        expect(Object.keys(options.where).length).toEqual(0);
      });

      await commentService.findAll();
    });
  });

  describe('create', () => {
    it('should throw movie not found exception when movie not found', async () => {
      const model = { body: 'aasdasd', movieId: 1 };

      jest.spyOn(movieRepository, 'findOne').mockImplementation(id => {
        return undefined;
      });

      let exception: MovieNotFoundException;

      try {
        await commentService.create(model);
      } catch (error) {
        exception = error;
      }

      expect(exception).toBeInstanceOf(MovieNotFoundException);
    });
  });
});
