import {observer} from 'mobx-react';
import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {NewsItem} from '../../../components';
import {accountStore} from '../../../store';
import {rootStyles} from '../../../styles';

type Props = {
  wrapperStyle?: string;
}

const Content: FC<Props> = ({wrapperStyle}) => {
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const user = accountStore.user;

  if (!user) return null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    accountStore.addNews(photos, text);
  };
  const addPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target.files;
    if (!files) return;
    const file = files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      const file: string = fr.result as string;
      if (!file) return;
      target.value = '';
      setPhotos([...photos, file]);
    };
  };

  const deletePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((photo, i) => i != index));
  };

  return (
    <div className={`${wrapperStyle}`}>
      <div className='bg-white p-4 rounded-3xl shadow`'>
        <div className={rootStyles.title}>{user.fullName}</div>
        <div>{user.areasOfInterest}</div>
      </div>
      <form action=""
        onSubmit={onSubmit}
        className={'bg-white p-4 rounded-3xl shadow my-4'}>
        <div className='text-2xl font-medium'>Новая новость</div>
        <div
          className='text-sm text-gray-500 mb-2'>
              Поделитесь новостями со своими друзьями!
        </div>
        <div>
          <div className='flex flex-wrap'>
            {photos.map((photo, i) =>
              <img key={i} src={photo}
                onClick={() => deletePhoto(i)}
                className='w-32 h-28
                object-cover m-2 rounded border-2 border-gray-300'/>)}
          </div>
          <label
            htmlFor="photos"
            className={`${rootStyles.btn} mb-2 cursor-pointer`}
          >Добавить фото</label>
          <input type="file" name="" id="photos" className='hidden'
            accept=".png, .jpg, .jpeg" onChange={addPhoto}/>
        </div>
        <div className='flex flex-col items-start'>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="w-full
            bg-gray-100 h-24 resize-none
            outline-none p-2 radius mb-2" />
          <button type="submit"
            className={`
          ${rootStyles.btn}
          ${accountStore.newsLoading || !text ?
            'pointer-events-none opacity-40': ''}`}>
            Поделиться
          </button>
        </div>
      </form>
      <div>
        {accountStore.newsLoading ? 'Loading...':
          accountStore.news.map((news) => {
            return <NewsItem
              key={news.id}
              item={news}
              wrapperStyle={'mb-3.5'}
            />;
          })}</div>
    </div>
  );
};

export default observer(Content);
