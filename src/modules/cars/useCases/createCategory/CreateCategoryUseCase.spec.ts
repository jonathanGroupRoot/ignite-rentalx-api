import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory,
        );
    });

    it('should be able to create a new category', async () => {
        const category = {
            name: 'Test category',
            description: 'Teste DEsc',
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name,
        );
        expect(categoryCreated).toHaveProperty('id');
    });

    it('should not be able to create a new category with name exists', async () => {
        const category = {
            name: 'Create Category',
            description: 'Create desc',
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        await expect(
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            }),
        ).rejects.toEqual(new AppError('Category Already Exists'));
    });
});
