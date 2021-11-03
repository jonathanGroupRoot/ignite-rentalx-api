import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const avatarFile = request.file.filename;

        const updateAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        await updateAvatarUseCase.execute({
            user_id: id,
            avatar_file: avatarFile,
        });
        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };
