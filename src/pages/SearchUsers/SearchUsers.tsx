import {observer} from 'mobx-react';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {FriendItem, InputField} from '../../components';
import {User} from '../../models';
import {accountStore} from '../../store';
import {rootStyles} from '../../styles';
import {FriendsSearch} from '../../types';


// const schema = yup.object().shape({
//   ageFrom: yup.string().matches(/^[0-9]+$/, 'Введите только числа'),
//   ageTo: yup.string().matches(/^[0-9]+$/, 'Введите только числа'),
//   birthCityId: yup.string().matches(/^[0-9]+$/, 'Введите только числа'),
//   currentCityId: yup.string().matches(/^[0-9]+$/, 'Введите только числа'),
// }).required();


const defaultValues: FriendsSearch = {
  ageFrom: '',
  ageTo: '',
  birthCityId: '',
  currentCityId: '',
};

const SearchUsers = () => {
  const {searchFriendError, searchFriendLoading, searchFriends} = accountStore;
  const {control, handleSubmit} = useForm({
    defaultValues,
  });

  const onSubmit = (data: typeof defaultValues) => {
    accountStore.fetchSearchUsers(data);
  };

  const handleRequest = (user: User) => {
    accountStore.sendRequestFriend(user.id);
    alert(`Заявка в друзья к "${user.fullName}" успешно отправленна`);
  };
  if (searchFriendLoading) return <div>Loading...</div>;
  if (searchFriendError) return <div>{searchFriendError}</div>;
  return (
    <div className='container mx-auto px-4'>
      <h2 className={`${rootStyles.title} mb-4`}>Поиск друзей</h2>
      {/* FORM  */}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="ageFrom"
          render={({
            field: {onChange, value},
            fieldState: {error},
          }) => (
            <InputField label='Возраст от:'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="ageTo"
          render={({
            field: {onChange, value, name},
            fieldState: {error},
          }) => (
            <InputField label='Возраст до:'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="birthCityId"
          render={({
            field: {onChange, value, name},
            fieldState: {error},
          }) => (
            <InputField label='Id города откуда: '
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="currentCityId"
          render={({
            field: {onChange, value},
            fieldState: {error},
            formState,
          }) => (
            <InputField label='Текущий город: '
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <button type="submit" className={rootStyles.btn}>Найти</button>
      </form>
      <div className={rootStyles.card}>
        {searchFriends.length ? searchFriends.map((user) => <FriendItem
          key={user.id} user={user}
          wrapperStyle={`${rootStyles.card} mb-2`}
          buttons={[
            {
              title: 'Написать',
              className: `${rootStyles.btn} mr-2`,
              onClick: () => {},
            },
            {
              title: 'Отправить заявку',
              className: `${rootStyles.btn}`,
              onClick: () => handleRequest(user),
            },
          ]}/>): 'Упс... похоже по вашему запросу никого не найдено'}
      </div>
    </div>
  );
};

export default observer(SearchUsers);
