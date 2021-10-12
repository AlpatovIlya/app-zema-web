import {observer} from 'mobx-react-lite';
import React from 'react';
import {FriendItem} from '../../components';
import {Candidate} from '../../models';
import {accountStore} from '../../store';
import {rootStyles} from '../../styles';

const Candidates = () => {
  const {candidates, candidatesError, candidatesLoading} = accountStore;
  if (candidatesLoading) return <div>Loading...</div>;
  if (candidatesError) return <div>{candidatesError}</div>;

  const handleApply = (user: Candidate) => {
    accountStore.applyCandidate(user);
  };

  const handleReject= (user: Candidate) => {
    accountStore.rejectCandidate(user);
  };
  return (
    <div className='container mx-auto px-4 mt-4'>
      <h2 className={`${rootStyles.title} ${rootStyles.card} 
        mb-10`}>Заявки</h2>
      {candidates.length ? candidates.map((candidate) => <FriendItem
        key={candidate.requestId} user={candidate.user}
        wrapperStyle={`${rootStyles.card} mb-2`}
        buttons={[
          {
            title: 'Добавить',
            className: `${rootStyles.btn} mr-2`,
            onClick: () => handleApply(candidate),
          },
          {
            title: 'Удалить',
            className: `border-2
            border-red-600  p-2 rounded-sm
            px-14 text-white
            duration-200
            hover:bg-transparent
            hover:text-red-600 inline-block bg-red-600`,
            onClick: () => handleReject(candidate),
          },
        ]}/>): 'У вас еще  нет заявок в друзья'}
    </div>
  );
};

export default observer(Candidates);
