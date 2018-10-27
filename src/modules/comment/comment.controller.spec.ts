import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MovieNotFoundException } from '../../exceptions/movie-not-found.exception';
import { HttpException } from '@nestjs/common';

describe('CommentController', () => {
  let commentController: CommentController;
  let commentService: CommentService;

  beforeEach(() => {
    (commentService = new CommentService({} as any, {} as any)),
      (commentController = new CommentController(commentService));
  });

  describe('findAll', () => {
    it('should parse query parametr string to undefined', async () => {
      jest.spyOn(commentService, 'findAll').mockImplementation(id => {
        expect(id).toBeUndefined();
      });
      await commentController.findAll({ movieId: 'asdasdsa' });
    });

    it('should do nothing with query param as interger', async () => {
      jest.spyOn(commentService, 'findAll').mockImplementation(id => {
        expect(id).toEqual(5);
      });

      await commentController.findAll({ movieId: '5' });
    });
  });

  describe('createComment', () => {
    it('should handle MovieNotFoundException and show http exception', async () => {
      jest.spyOn(commentService, 'create').mockImplementation(() => {
        throw new MovieNotFoundException();
      });

      let exception: HttpException;

      try {
        await commentController.createComment({} as any);
      } catch (error) {
        exception = error;
      }

      expect(exception).toBeInstanceOf(HttpException);
    });
  });
});
