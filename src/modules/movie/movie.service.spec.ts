import { MovieService } from './movie.service';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: Repository<MovieEntity>;

  beforeEach(() => {
    movieRepository = new Repository<MovieEntity>();

    movieService = new MovieService(movieRepository);
  });

  describe('findAll', () => {
    it('should select only basic fields', async () => {
      jest.spyOn(movieRepository, 'find').mockImplementation(options => {
        expect(options.select).toContain('id');
        expect(options.select).toContain('title');
        expect(options.select).toContain('extraData');
      });

      await movieService.findAll(undefined, undefined, undefined, undefined);
    });

    it('should correctly bind sortDesc value', async () => {
      jest.spyOn(movieRepository, 'find').mockImplementation(options => {
        expect(options.order.title).toEqual('DESC');
      });

      await movieService.findAll(undefined, undefined, 'title', true);
    });
  });

  describe('create', () => {
    it('should return record from database when movie with title exist', async () => {
      jest
        .spyOn(movieService, 'fetchMovieData' as any) // Any needed to spying in private method
        .mockImplementation(_ => {
          // Should not be called
          expect(true).toBe(false);
        });

      const model = { title: 'Example title' };

      jest.spyOn(movieRepository, 'findOne').mockImplementation(options => {
        expect(options.where.title).toEqual(model.title);

        return model;
      });

      const result = await movieService.create(model);

      expect(result).toBe(model);
    });
  });
});
