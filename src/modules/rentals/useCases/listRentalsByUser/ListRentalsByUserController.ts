import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUseUseCase } from './ListRentalsByUserUseUseCase';

class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;

        const listRentalsByUserUseCase = container.resolve(
            ListRentalsByUserUseUseCase,
        );

        const rentalsUser = await listRentalsByUserUseCase.execute(user_id);

        return response.status(200).json(rentalsUser);
    }
}
export { ListRentalsByUserController };
