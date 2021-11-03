import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticate';

const carsRouter = Router();

const createCarController = new CreateCarController();
const listCarAvailableController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImages = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRouter.post(
    '/',
    ensureAuthenticate,
    ensureAdmin,
    createCarController.handle,
);

carsRouter.get('/available', listCarAvailableController.handle);

carsRouter.post(
    '/specifications/:id',
    ensureAuthenticate,
    ensureAdmin,
    createCarSpecificationController.handle,
);

carsRouter.post(
    '/images/:id',
    ensureAuthenticate,
    ensureAdmin,
    upload.array('images'),
    uploadCarImages.handle,
);

export { carsRouter };
