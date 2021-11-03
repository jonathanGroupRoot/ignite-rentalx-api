import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
    beforeEach(() => {
        specificationsRepositoryInMemory =
            new SpecificationRepositoryInMemory();
        carRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carRepositoryInMemory,
            specificationsRepositoryInMemory,
        );
    });

    it('should be able to add a new specification to a now-existent car', async () => {
        const car_id = '1234';
        const specifications_id = ['212323'];

        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            }),
        ).rejects.toEqual(new AppError('Car does not exist'));
    });

    it('should be able to add a new specification to the car', async () => {
        const car = await carRepositoryInMemory.create({
            name: 'Name Car',
            description: 'Description Car',
            daily_date: 100,
            license_plate: 'ABC-123',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category',
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: 'tets',
            name: 'test',
        });
        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty('specifications');
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
