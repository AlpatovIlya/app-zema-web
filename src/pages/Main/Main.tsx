import {observer} from 'mobx-react';
import React from 'react';
import {accountStore} from '../../store';
import {Content, Sidebar} from './components';

const Main = () => {
  if (!accountStore.user) return null;


  return (
    <div className='container mx-auto px-4 pt-4'>
      <div className='flex' style={{}}>
        <Sidebar friends={accountStore.friends}
          user={accountStore.user} wrapperStyle='' style={{
            width: '300px',
          }}/>
        <Content wrapperStyle='flex-1 ml-8'/>
      </div>
    </div>
  );
};


export default observer(Main);
