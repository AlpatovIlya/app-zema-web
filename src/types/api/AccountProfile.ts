import {ApiUser} from './ApiUser';


export interface LoginApiType {
    status: string;
    message: string;
    data: {
        token: string;
        user: ApiUser;
    };
  }


export interface SignUpApiType {
    status: string;
    message: string;
    data: {
        code: string
    };
  }


export interface RefreshProfileType {
    status: string;
    message: string;
    data: {
        user: ApiUser;
    };
}


