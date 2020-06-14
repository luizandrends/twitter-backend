import { Request, Response } from 'express';

class UserController {
  public async store(request: Request, response: Response): Promise<Response> {
    return response.json({ hello: 'world' });
  }
}

export default UserController;
