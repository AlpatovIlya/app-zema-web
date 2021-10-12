/* eslint-disable require-jsdoc */

import {makeAutoObservable} from 'mobx';
import {News} from '../models';


class NewsStore {
    news: News[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
      makeAutoObservable(this);
    }
}

const newsStore = new NewsStore();

export default newsStore;
