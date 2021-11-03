import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserCase } from './AuthenticateUserUseCase';

let authenticateUserRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserCase;
let userTokensRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        authenticateUserRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UsersTokenRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        authenticateUserUseCase = new AuthenticateUserCase(
            authenticateUserRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider,
        );

        createUserUseCase = new CreateUserUseCase(
            authenticateUserRepositoryInMemory,
        );
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            name: 'jonathan_root',
            email: 'jonathan@gmail.com',
            password: '1234',
            driver_license: 'ab',
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'falseEmail@gmail.com',
                password: '1212121',
            }),
        ).rejects.toEqual(new AppError('Email or password incorrect'));
    });

    it('should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUserDTO = {
            name: 'jonathan_root_',
            email: 'jonathanvin@gmial.com',
            password: '11212',
            driver_license: '2121',
        };

        await authenticateUserRepositoryInMemory.create(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: '32932032093',
            }),
        ).rejects.toEqual(new AppError('Email or password incorrect'));
    });
});
