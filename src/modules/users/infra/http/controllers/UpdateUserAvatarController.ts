import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UpdateUserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { originalname: name, filename: path } = request.file;

    const updateAvatar = container.resolve(UpdateUserAvatarService);

    const avatar = await updateAvatar.execute({
      originalname: name,
      filename: path,
      user_id: request.user.id,
    });

    return response.json(avatar);
  }
}

export default UpdateUserAvatarController;
