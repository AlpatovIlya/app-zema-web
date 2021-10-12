/* eslint-disable camelcase */
import {User} from '../../models';
import {IFile} from '../interfaces';

type GetNewsApi = {
    status: string;
    message?: any;
    data: {
        publications: Publication[]
    };
}

export interface Publication {
    id: number;
    content: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    user: User;
    files: IFile[];
}


export type {GetNewsApi};
