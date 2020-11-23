import { IUser } from '../interfaces/user.inteface';

export class User implements IUser {
    constructor(
        public id: number | string,
        public username: string,
        public email: string,
        public password: string,
    ) { }
}