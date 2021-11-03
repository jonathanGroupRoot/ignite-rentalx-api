import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { compraRouter } from './compra.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationRoutes } from './specifications.routes';
import { userRouter } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specification', specificationRoutes);
router.use('/compra', compraRouter);
router.use('/users', userRouter);
router.use(authenticateRouter);
router.use('/cars', carsRouter);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);

export { router };
