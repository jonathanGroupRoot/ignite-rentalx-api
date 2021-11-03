import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompraUseCase } from './CreateCompraUseCase';

class CreateCompraController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, item, value } = request.body;

        const createCompraUseCase = container.resolve(CreateCompraUseCase);

        await createCompraUseCase.execute({
            name,
            item,
            value,
        });

        return response.status(201).send();
    }
}

export { CreateCompraController };
