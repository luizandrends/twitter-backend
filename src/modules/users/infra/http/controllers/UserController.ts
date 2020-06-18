import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UserController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, username, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      username,
      password,
    });

    return response.json(user);
  }
}

export default UserController;
