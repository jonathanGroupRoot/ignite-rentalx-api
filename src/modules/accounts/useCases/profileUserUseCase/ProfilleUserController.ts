import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProfilleUserUseCase } from './ProfileUserUseCase';

export class ProfilleUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const profilleUserUseCase = container.resolve(ProfilleUserUseCase);

        const user = await profilleUserUseCase.execute(id);

        return response.json(user);
    }
}
