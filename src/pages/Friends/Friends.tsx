/* eslint-disable max-len */
import {observer} from 'mobx-react';
import React from 'react';
import {FriendItem} from '../../components';
import {User} from '../../models';
import {accountStore} from '../../store';
import {rootStyles} from '../../styles';

const Friends = () => {
  const {friends, friendsLoading, friendsError} = accountStore;
  if (friendsLoading) return <div>Loading...</div>;
  if (friendsError) return <div>{friendsError}</div>;

  const handleDeleteFriend = (user: User) => {
    const confirm = window.confirm(`Вы действительно хотите удалить "${user.fullName}" из друзей ?`);
    if (confirm) accountStore.deleteFriend(user.id);
  };
  return (
    <div className='container mx-auto px-4 mt-4'>
      <h2 className={`${rootStyles.title} ${rootStyles.card} 
        mb-10`}>Друзья</h2>
      {friends.length ?friends.map((friend) => <FriendItem key={friend.id} user={friend}
        wrapperStyle={`${rootStyles.card} mb-2`}
        buttons={[
          {
            title: 'Написать',
            className: `${rootStyles.btn} mr-2`,
            onClick: () => {},
          },
          {
            title: 'Удалить',
            className: `border-2
            border-red-600  p-2 rounded-sm
            px-14 text-white
            duration-200
            hover:bg-transparent
            hover:text-red-600 inline-block bg-red-600`,
            onClick: () => handleDeleteFriend(friend),
          },
        ]}/>): <div>У вас еще нет друзей</div>}
    </div>
  );
};

export default observer(Friends);
