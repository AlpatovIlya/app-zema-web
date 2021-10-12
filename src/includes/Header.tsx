/* eslint-disable max-len */
import React, {CSSProperties} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {logoImage} from '../assets';
import routingNames from '../constants/routingName';
import {accountStore} from '../store';

const Header = () => {
  const history = useHistory();
  const linkStyle = 'inline-block mx-2 text-lg text-gray-900 hover:text-indigo-700 duration-200';
  const activeLinkStyle: CSSProperties = {
    opacity: 0.2,
  };

  const signOut = () => {
    accountStore.signOut();
    history.push(routingNames.SIGN_IN);
  };
  return (
    <div className='bg-white p-2 shadow'>
      <div className='container mx-auto px-4 flex items-center justify-between'>
        <Link to={routingNames.Main}>
          <img src={logoImage} alt="logo" className='w-16 h-16'/>

        </Link>
        <nav>
          <NavLink to={routingNames.News} className={linkStyle} activeStyle={activeLinkStyle}>Новости</NavLink>
          <NavLink to={routingNames.Friends} className={linkStyle} activeStyle={activeLinkStyle}>Друзья</NavLink>
          <NavLink to={routingNames.Candidates} className={linkStyle} activeStyle={activeLinkStyle}>Заявки</NavLink>
          <NavLink to={routingNames.SearchUsers} className={linkStyle} activeStyle={activeLinkStyle}>Поиск друзей</NavLink>
        </nav>
        <div>
          <NavLink to={routingNames.Settings} className={linkStyle} activeStyle={activeLinkStyle}>Настройки</NavLink>
          <button className={linkStyle} onClick={signOut}>Выйти</button>
        </div>

      </div>
    </div>
  );
};

export default Header;
