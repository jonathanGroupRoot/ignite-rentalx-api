import { Router } from 'express';

import { CreateCompraController } from '../../../../modules/cars/useCases/createCompra/CreateCompraController';

const compraRouter = Router();
const createCompraController = new CreateCompraController();

compraRouter.post('/', createCompraController.handle);
export { compraRouter };
