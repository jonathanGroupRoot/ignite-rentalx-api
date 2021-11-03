import { container } from 'tsyringe';

import '@shared/container/providers';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/CarRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { CompraRepository } from '@modules/cars/infra/typeorm/repositories/CompraRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ICompraRepository } from '@modules/cars/repositories/ICompraRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificatiosRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',
    SpecificationsRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICompraRepository>(
    'CompraRepository',
    CompraRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarRepository);

container.registerSingleton<ICarsImagesRepository>(
    'CarsImagesRepository',
    CarsImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository,
);

container.registerSingleton<IUsersTokenRepository>(
    'UsersTokensRepository',
    UserTokensRepository,
);
