import { Router } from 'express';
const userRouter: Router = Router();
import { addNewUser, getAllDataForUser } from 'src/controllers/userController';
userRouter.post('/add', addNewUser);
userRouter.post('/my', getAllDataForUser);
export = userRouter;
