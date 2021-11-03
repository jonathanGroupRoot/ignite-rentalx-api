import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carRepositoryInMemory,
        );
    });

    it('should be able to list all available cars', async () => {
        const car = await carRepositoryInMemory.create({
            name: 'Audi A1',
            description: 'Description Car',
            daily_date: 110.0,
            license_plate: 'ABC4-09',
            fine_amount: 40,
            brand: 'Audi',
            category_id: 'aa307a58-cafe-4ae0-9c92-362207892651',
        });
        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by brand', async () => {
        const car = await carRepositoryInMemory.create({
            name: 'Audi A3',
            description: 'Description Car',
            daily_date: 110.0,
            license_plate: 'ABC4-09',
            fine_amount: 40,
            brand: 'AudiA3',
            category_id: 'aa307a58-cafe-4ae0-9c92-362207892651',
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: 'AudiA3',
        });
        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by name', async () => {
        const car = await carRepositoryInMemory.create({
            name: 'Audi A7',
            description: 'Description Car',
            daily_date: 110.0,
            license_plate: 'ABC4-092',
            fine_amount: 40,
            brand: 'AudiAQ7',
            category_id: 'aa307a58-cafe-4ae0-9c92-362207892651',
        });
        const cars = await listAvailableCarsUseCase.execute({
            name: 'Audi A7',
        });
        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by category', async () => {
        const car = await carRepositoryInMemory.create({
            name: 'Audi A7',
            description: 'Description Car',
            daily_date: 110.0,
            license_plate: 'ABC4-092',
            fine_amount: 40,
            brand: 'AudiAQ7',
            category_id: '212312',
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: '212312',
        });
        expect(cars).toEqual([car]);
    });
});
