import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRentals/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticate, createRentalController.handle);
rentalRoutes.post(
    '/devolution/:id',
    ensureAuthenticate,
    devolutionRentalController.handle,
);
rentalRoutes.get(
    '/users',
    ensureAuthenticate,
    listRentalsByUserController.handle,
);

export { rentalRoutes };
