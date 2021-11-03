import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
    async authenticate(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserCase = container.resolve(AuthenticateUserCase);

        const user = await authenticateUserCase.execute({
            email,
            password,
        });
        return response.json(user);
    }
}

export { AuthenticateUserController };
