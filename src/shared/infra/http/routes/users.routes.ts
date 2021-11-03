import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ListUserController } from '@modules/accounts/useCases/listUser/ListUserController';
import { ProfilleUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfilleUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticate';

const userRouter = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfilleUserController();

userRouter.post('/', createUserController.handle);
userRouter.patch(
    '/avatar',
    ensureAuthenticate,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle,
);
userRouter.get('/', listUserController.handle);

userRouter.get('/profile', ensureAuthenticate, profileUserController.handle);

export { userRouter };
