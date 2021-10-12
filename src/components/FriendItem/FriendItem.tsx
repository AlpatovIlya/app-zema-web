import React, {FC} from 'react';
import {noAvatarImage} from '../../assets';
import {User} from '../../models';

type ButtonProps = {
    title: string;
    className?: string;
    onClick: () => void;
}

type Props = {
    user: User;
    wrapperStyle?: string;
    buttons?: ButtonProps[]
}

const FriendItem: FC<Props> = ({user, wrapperStyle, buttons = []}) => {
  return (
    <div className={`flex justify-between ${wrapperStyle}`}>
      <div className='flex'>
        <img src={user.avatar || noAvatarImage} alt="user"
          className='w-16 h-16 rounded-full mr-2'/>
        <div className='mt-2'>
          <div>{user.fullName}</div>
          <div>{user.currentCity}</div>
        </div>
      </div>
      <div className='flex items-center'>
        {buttons.map((btn, i) => <button key={i}
          className={btn.className}
          onClick={btn.onClick}>{btn.title}</button>) }
      </div>
    </div>
  );
};

export default FriendItem;
