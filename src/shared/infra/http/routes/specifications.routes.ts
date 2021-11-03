import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticate';

const specificationRoutes = Router();

const createSpecification = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.post(
    '/',
    ensureAuthenticate,
    ensureAdmin,
    createSpecification.handle,
);

specificationRoutes.get('/', listSpecificationController.handle);

export { specificationRoutes };
