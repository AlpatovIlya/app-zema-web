import React, {ChangeEvent, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {InputField} from '../../components';
import {accountStore} from '../../store';
import {observer} from 'mobx-react';
import {noAvatarImage} from '../../assets';
import {useHistory} from 'react-router';
import routingNames from '../../constants/routingName';
import {rootStyles} from '../../styles';

const schema = yup.object({
  name: yup.string().required('это обязательное поле'),
  surname: yup.string().required('это обязательное поле'),
  patronymic: yup.string().required('это обязательное поле'),
  age: yup.string().matches(/^[0-9]+$/, 'ВВедите только числа')
      .required('это обязательное поле'),
  birthCityId: yup.string().matches(/^[0-9]+$/, 'ВВедите только числа')
      .required('это обязательное поле'),
  currentCityId: yup.number().positive('Возраст должен быть больше 0!')
      .required('это обязательное поле'),
  education: yup.string().required('это обязательное поле'),
  gender: yup.string().required('это обязательное поле'),
  career: yup.string().required('это обязательное поле'),
  helpOffer: yup.string(),
  helpNeeded: yup.string(),
  areasOfInterest: yup.string().required(''),

}).required('это обязательное поле');


const Settings = () => {
  const defaultValues = {
    name: accountStore.user?.name || '',
    surname: accountStore.user?.surname || '',
    patronymic: accountStore.user?.patronymic || '',
    birthCityId: accountStore.user?.birthCityId || '',
    currentCityId: accountStore.user?.currentCityId || '',
    education: accountStore.user?.education || '',
    gender: accountStore.user?.gender || '',
    career: accountStore.user?.career || '',
    helpOffer: accountStore.user?.helpOffer || '',
    helpNeeded: accountStore.user?.helpNeeded || '',
    age: accountStore.user?.age || '',
    areasOfInterest: accountStore.user?.areasOfInterest || '',
  };
  const history = useHistory();
  const [avatar, setAvatar] =
    useState<string>(accountStore.user?.avatar || noAvatarImage);
  const {register, handleSubmit, reset, control} = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: typeof defaultValues) => {
    console.log(data);
    accountStore.changeProfile({
      avatar: avatar,
      birth_city_id: +data.birthCityId,
      current_city_id: +data.currentCityId,
      education: data.education,
      help_needed: data.helpNeeded,
      help_offer: data.helpOffer,
      areas_of_interest: data.areasOfInterest,
      career: data.career,
      age: data.age.toString(),
      surname: data.surname,
      name: data.name,
      patronymic: data.patronymic,
      gender: data.gender,
    });
    history.push(routingNames.Main);
    alert('Профиль успешно обновлен');
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
      setAvatar(file);
    };
  };

  const inputWrapperStyle = 'mb-3';
  console.log('name', accountStore.user?.name);
  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className='container mx-auto p-4 mt-4 bg-white rounded '>
      <h1 className='text-3xl font-medium text-center mb-4'>Настройки</h1>
      <div>Фото</div>
      <img src={avatar} alt="фото" className='w-32 h-32'/>
      <input type="file" id="" onChange={addPhoto}/>
      <Controller
        control={control}
        name="name"
        render={({
          field: {onChange, value},
          fieldState: {error},
        }) => (
          <InputField
            label='Имя'
            wrapperStyle={inputWrapperStyle}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="surname"
        render={({
          field: {onChange, value},
          fieldState: {error},
        }) => (
          <InputField
            label='Фамилия'
            wrapperStyle={inputWrapperStyle}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="patronymic"
        render={({
          field: {onChange, value},
          fieldState: {error},
        }) => (
          <InputField
            label='Отчество'
            wrapperStyle={inputWrapperStyle}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <div>Образование</div>
      <select {...register('education')}
        className='border-2 p-2 outline-none'>
        <option value="Нет">Нет</option>
        <option value="Среднее">Среднее</option>
        <option value="Среднее специальное">Среднее специальное</option>
        <option value="Неоконченное высшее">Неоконченное высшее</option>
        <option value="Высшее">Высшее</option>
        <option value="Бакалавр">Нет</option>
        <option value="Магистр">Магистр</option>
        <option value="Кандидат наук">Кандидат наук</option>
        <option value="Доктор наук">Доктор наук</option>
      </select>
      <div>
        <div>Пол</div>
        <div>
          <input type="radio" value='Мужской'id="men"
            {...register('gender')}/>
          <label htmlFor={'men'}>Мужской</label>
        </div>
        <div>
          <input type="radio" value='Женский'id="woman"
            {...register('gender')}/>
          <label htmlFor={'woman'}>Женский</label>
        </div>
      </div>
      <Controller
        control={control}
        name="career"
        render={({
          field: {onChange, value},
          fieldState: {error},
        }) => (
          <InputField
            label='Род деятельности (работа)'
            wrapperStyle={inputWrapperStyle}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="helpOffer"
        render={({
          field: {onChange, value},
          fieldState: {error},
        }) => (
          <InputField
            label='Чем поможете земляку?'
            wrapperStyle={inputWrapperStyle}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="helpNeeded"
        render={({
          field: {onChange, value},
          fieldState: {error},
        }) => (
          <InputField
            label='Какая помощь требуется Вам?'
            wrapperStyle={inputWrapperStyle}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="age"
        render={({
          field: {onChange, value},
          fieldState: {error},
        }) => (
          <InputField
            type='number'
            label='Ваш возраст'
            wrapperStyle={inputWrapperStyle}
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
          field: {onChange, value},
          fieldState: {error},
        }) => (
          <InputField
            type='number'
            label='Родной город'
            wrapperStyle={inputWrapperStyle}
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
        }) => (
          <InputField
            type='number'
            label='Город проживания'
            wrapperStyle={inputWrapperStyle}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <button type='button' onClick={() => reset()}
        className={`${rootStyles.btn} mr-2`}
      >Отменить</button>
      <button className={`${rootStyles.btn} mr-2`}>Сохранить изменения</button>
    </form>
  );
};

export default observer(Settings);
