import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  beforeEach(() => {
    movieService = new MovieService({} as any);
    movieController = new MovieController(movieService);
  });

  describe('findAll', () => {
    it('should take default query params value', async () => {
      jest
        .spyOn(movieService, 'findAll')
        .mockImplementation((start, limit, sortBy, sortDesc) => {
          expect(limit).toEqual(20);
          expect(start).toEqual(0);
          expect(sortBy).toEqual('title');
          expect(sortDesc).toBeFalsy();
        });

      await movieController.findAll({} as any);
    });
  });
});
