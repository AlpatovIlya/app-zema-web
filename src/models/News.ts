/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import User from './User';
import {Publication} from '../types/api/NewsTypes';
import {IFile, INews} from '../types/interfaces';

class News implements INews {
  id: number;
  creator: User;
  content: string;
  createdAt: Date;
  files: IFile[];
  constructor(data: Publication) {
    this.id = data.id;
    this.creator = data.user;
    this.content = data.content;
    this.createdAt = data.created_at;
    this.files = data.files;
  }

  static getNewsByAPI(data: Publication) {
    return new News(data);
  }
}

export default News;
