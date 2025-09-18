import { Router, Request, Response, NextFunction } from 'express';
import { UserDTO } from './dto/user.dto.js';
import { UserService } from './user.service.js';
import { HttpError } from '@/errors/http-error.js';
import { validateDTO } from '@/middlewares/validateDTO.middleware.js';
import { CreateUserScheme } from './account-scheme/account-scheme.js';
import { validateAdminOrUser } from '@/middlewares/validateAdminOrUser.middleware.js';
import { validateAdmin } from '@/middlewares/validateAdmin.middleware.js';

export class UserController {
  router: Router;

  constructor(private userService: UserService) {
    this.router = Router();
  }

  routes() {
    this.router.post(
      '/create',
      validateDTO(CreateUserScheme),
      async (req: Request<object, object, UserDTO>, res: Response, next: NextFunction) => {
        const body = req.body;

        const result = await this.userService.createUser(body);
        if (result) {
          res.send(result);
          return;
        } else {
          next(new HttpError(422, 'User already exists'));
        }
      },
    );

    this.router.get('', validateAdmin(), async (req, res) => {
      const result = await this.userService.getAllUsers();

      res.send(result);
    });

    this.router.get('/:id', validateAdminOrUser(), async (req, res) => {
      const id = req.params.id;
      const result = await this.userService.getUserByID(id);

      res.send(result);
    });

    this.router.put('/:id', validateAdminOrUser(), async (req, res) => {
      const user = req.user;
      const result = await this.userService.updateUserStatus(user);

      res.send(result);
    });

    return this.router;
  }
}
