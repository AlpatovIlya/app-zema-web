/* eslint-disable max-len */
import {AxiosResponse} from 'axios';
import {User} from '../models';
import {ProfileType} from '../types';
import {LoginApiType} from '../types/api';
import {RefreshProfileType} from '../types/api/AccountProfile';
import {api} from './_api/api';

const signIn = async (phone: string, password: string): Promise<[User, string]> => {
  try {
    const {data}: AxiosResponse<LoginApiType> = await api.post('/login', {phone, password});
    const {user, token} = data.data;
    const currentUser = User.createUserByApi(user);
    return [currentUser, token];
  } catch (err: any) {
    throw new Error(err.response.data.message || 'Упс... что-то пошло не так');
  }
};

const signUp = async (name: string, email: string, phone: string, password: string): Promise<[User, string]> => {
  try {
    await api.post('/register', {name, email, phone, password, confirm_password: password});
    return signIn(phone, password);
  } catch (err: any) {
    throw new Error(err.response.data.message || 'Упс... что-то пошло не так');
  }
};

const refreshProfile = async (userId:number, data: ProfileType): Promise<User> => {
  try {
    const res: AxiosResponse<RefreshProfileType> = await api.post(`/users/${userId}`, data);
    console.log(res);
    const user = User.createUserByApi(res.data.data.user);
    return user;
  } catch (err: any) {
    throw new Error(err.response.data.message || 'Упс... что-то пошло не так');
  }
};


const accountServices = () => ({signIn, signUp, refreshProfile});

export default accountServices;
