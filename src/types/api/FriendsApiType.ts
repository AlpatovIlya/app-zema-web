/* eslint-disable camelcase */
import {ApiUser} from './ApiUser';

interface Data {
        users: ApiUser[];
    }

export interface GetFriendsType {
        status: string;
        message?: any;
        data: Data;
    }

export interface GetCandidatesType {
        status: string;
        message: null;
        data: {
            friend_requests: {
                id: number,
                user: ApiUser
            }[];
        };
    }

export interface SearchFriendsType {
    status: string;
    message: null;
    data: {
        users: ApiUser[]
    }
}


