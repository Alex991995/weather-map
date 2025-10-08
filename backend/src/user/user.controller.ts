import { Router, Request, Response, NextFunction } from 'express';
import { IidCity, UserDTO } from './dto/user.dto.js';
import { UserService } from './user.service.js';
import { HttpError } from '@/errors/http-error.js';
import { validateDTO } from '@/middlewares/validateDTO.middleware.js';
import { CreateUserScheme } from '../auth/scheme/register-scheme.js';

export class UserController {
  router: Router;

  constructor(private userService: UserService) {
    this.router = Router();
  }

  routes() {
    // this.router.post(
    //   '/create',
    //   validateDTO(CreateUserScheme),
    //   async (req: Request<object, object, UserDTO>, res: Response, next: NextFunction) => {
    //     const body = req.body;
    //     const ISAdminExist = await this.userService.checkIfAdminExist();
    //     if (ISAdminExist && body.is_admin) {
    //       next(new HttpError(422, 'Admin already exists'));
    //     }
    //     const result = await this.userService.createUser(body);
    //     if (result) {
    //       res.send(result);
    //       return;
    //     } else {
    //       next(new HttpError(422, 'User already exists'));
    //     }
    //   },
    // );

    this.router.post(
      '/favorite',
      async (req: Request<object, object, IidCity>, res: Response, next: NextFunction) => {
        const id_city = req.body.id;
        const userId = req.user.id;

        const result = await this.userService.addFavoriteCity(userId, id_city);
        res.send({ is_added: result });
      },
    );

    this.router.post(
      '/default',
      async (
        req: Request<object, object, { defaultCityName: string }>,
        res: Response,
        next: NextFunction,
      ) => {
        const defaultCityName = req.body.defaultCityName;
        const userId = req.user.id;

        const result = await this.userService.setDefaultCity(userId, defaultCityName);
        res.send({ is_added: true });
      },
    );

    this.router.get(
      '/favorite',
      async (req: Request<object, object, IidCity>, res: Response, next: NextFunction) => {
        const userId = req.user.id;

        const result = await this.userService.getAllFavCityIDUser(userId);
        res.send(result);
      },
    );

    this.router.get(
      '/popular',
      async (req: Request<object, object, IidCity>, res: Response, next: NextFunction) => {
        const result = await this.userService.getPopularIDCityByAdmin();
        res.send(result);
      },
    );

    this.router.get('', async (req, res) => {
      const userId = req.user.id;
      const result = await this.userService.getUserByID(userId);

      res.send(result);
    });

    return this.router;
  }
}
