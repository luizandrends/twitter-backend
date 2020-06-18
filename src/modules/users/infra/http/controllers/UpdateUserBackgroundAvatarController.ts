import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserBackgroundService from '@modules/users/services/UpdateUserBackgroundService';

class UpdateUserBackgroundController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { originalname: name, filename: path } = request.file;

    const updateBackground = container.resolve(UpdateUserBackgroundService);

    const avatar = await updateBackground.execute({
      originalname: name,
      filename: path,
      user_id: request.user.id,
    });

    return response.json(avatar);
  }
}

export default UpdateUserBackgroundController;
