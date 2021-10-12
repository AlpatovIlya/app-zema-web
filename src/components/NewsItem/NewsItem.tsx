import React, {FC} from 'react';
import {noAvatarImage} from '../../assets';
import {News} from '../../models';

type Props = {
    item: News;
    wrapperStyle?: string;
}

const NewsItem: FC<Props> = ({item, wrapperStyle}) => {
  const user = item.creator;

  return (
    <div className={`${wrapperStyle} bg-white p-6 rounded-2xl shadow`}>
      <div
        className='flex flex-row border-b-2 pb-2 mb-2 items-center
        cursor-pointer'>
        <img src={user.avatar || noAvatarImage} alt="user photo"
          className='w-16 h-16 rounded-full mr-2'/>
        <div className='text-lg '>{user.name} {user.surname}</div>
        <div>{user.currentCity}</div>
      </div>
      <div className='flex flex-wrap'>
        {item.files.map((file, i) =>
          <img key={file.id} src={file.path}
            className='w-32 h-28
                object-cover m-2 ml-0 rounded border-2 border-gray-300'/>)}
      </div>
      <div>
        {item.content}
      </div>
    </div>
  );
};

export default NewsItem;
