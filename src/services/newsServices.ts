import {AxiosResponse} from 'axios';
import {News} from '../models';
import {GetNewsApi} from '../types/api';
import {api} from './_api/api';


const getByUserId = async (id: number): Promise<News[]> => {
  try {
    const {data}: AxiosResponse<GetNewsApi> = await api.get('/publications', {
      params: {
        user_id: id,
      },
    });
    return data.data.publications.map((news) =>
      News.getNewsByAPI(news)).reverse();
  } catch (err: any) {
    throw new Error(err.response.data.message || 'Упс... что-то пошло не так');
  }
};

const add = async (id:number, files: string[], content: string) => {
  const formData = new FormData();

  formData.append('user_id', id.toString());
  formData.append('content', content);
  files.map((file, i) => {
    formData.append('files[]', JSON.stringify({
      uri: file,
      type: 'image/jpeg',
      name: i + 'image',
    }));
  });

  try {
    await api.post('/publications', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err: any) {
    throw new Error(err.response.data.message || 'Упс... что-то пошло не так');
  }
};


const newsService = (id: number) => ({
  getUserNews: () => getByUserId(id),
  add: (files: string[], content: string) => add(id, files, content),
});

export default newsService;
