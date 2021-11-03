import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationUseCase } from './ListSpecificationUseCase';

class ListSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const specificationUseCase = container.resolve(
            ListSpecificationUseCase,
        );
        const specification = await specificationUseCase.execute();

        return response.json(specification);
    }
}

export { ListSpecificationController };
