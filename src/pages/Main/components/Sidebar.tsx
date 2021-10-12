import React, {FC} from 'react';
import {noAvatarImage} from '../../../assets';
import {User} from '../../../models';

type Props = {
    user: User;
    friends: User[];
    wrapperStyle?: string;
    style?: React.CSSProperties
}

const Sidebar: FC<Props> = ({user, style, wrapperStyle = '', friends = []}) => {
  return (
    <div className={`${wrapperStyle} bg-white p-2 rounded-3xl shadow`}
      style={style}>
      <div className='border-b-2 mb-2'>
        <img
          src={user.avatar}
          alt="фото пользователя"
          className='w-64 h-64 rounded-full mb-8 bg-cover'
          style={{
            margin: '0 auto 20px auto',
          }}
        />
        <div className='text-3xl'>{user.fullName}</div>
        <div className='text-gray-500'>{user.career || 'Не указан'}</div>
      </div>
      <div className='text-sm text-gray-800'>
        <div>Возраст: {user.age ? `${user.age} лет`: 'Не указан'} </div>
        <div>Пол: {user.gender ? `${user.gender}`: 'Не указан'}</div>
        <div>
          Образование: {user.education ? `${user.education}`: 'Не указан'}
        </div>
      </div>
      <div>
        <div className='text-2xl mb-3'>Друзья:</div>
        {friends.map((friend) => (
          <div key={friend.id} className='flex my-2
            cursor-pointer hover:opacity-80 duration-300'>
            <img src={friend.avatar || noAvatarImage} alt="friend"
              className='w-16 h-16 mr-2 rounded-full'/>
            <div>
              <div className='text-base'>{friend.fullName}</div>
              <div className='text-sm text-gray-900'>
                {friend.currentCity || '-Не указан'}</div>
            </div>
          </div>))}
      </div>
    </div>
  );
};

export default Sidebar;
