import {User} from '../../models';

export interface INews {
    id: number;
    creator: User;
    createdAt: Date;
    content: string;
    files: {
      id: number;
      path: string;
    }[];
  };
