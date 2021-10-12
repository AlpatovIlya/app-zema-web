import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputField} from '../../components';
import {Link} from 'react-router-dom';
import {routingName} from '../../constants';
import {accountStore} from '../../store';
import {observer} from 'mobx-react';

const schema = yup.object({
  phone: yup.string().min(18, 'Длина номера телефона 18 символов')
      .required('это обязательное поле'),
  password: yup.string()
      .min(8, 'Длина номера телефона 8 символов')
      .required('это обязательное поле'),
}).required();

const defaultValues = {
  phone: '',
  password: '',
};

const SignIn: FC = () => {
  const account = accountStore;
  const {handleSubmit, control} = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: typeof defaultValues) => {
    const currentPhone = '+' + data.phone.replace(/[^0-9]/g, '');
    account.login(currentPhone, data.password);
  };

  return (
    <div className='container mx-auto px-4 pt-20'>
      <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col  mx-24 bg-blue-50 rounded-xl p-8'>
        <h2 className="title font-bold text-6xl text-center mb-10">
          Вход в личный кабинет
        </h2>
        {account.error &&
          <div
            onClick={() => account.clearError()}
            className={'bg-red-400 p-4 rounded text-center text-white mb-3'}
          >{account.error}</div>}
        <Controller
          control={control}
          name="phone"
          render={({
            field: {onChange, value},
            fieldState: {error},
          }) => (
            <InputMask
              mask='+7 (999) 999-99-99'
              value={value}
              onChange={onChange}
              // @ts-ignore
              maskChar={null}>
              {(inputProps: any) => <InputField
                {...inputProps}
                type='tel'
                error={error?.message}
                label='Телефон'
                placeholder='+7 (999) 999-99-99'
                wrapperStyle={'mb-6'}
              />}

            </InputMask>

          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: {onChange, value},
            fieldState: {error},
          }) => (
            <InputField
              value={value}
              onChange={onChange}
              type='password'
              label='Пароль'
              placeholder='**********'
              error={error?.message}
              wrapperStyle={'mb-8'}
            />
          )}
        />

        <button type="submit"
          className={`
          self-center
          border-2
          border-blue-400 bg-blue-400 p-2 rounded-sm
          px-14 text-white
          duration-200
          hover:bg-transparent
          hover:text-blue-400
          ${account.isLoading ? 'pointer-events-none opacity-40': ''}
          `}>Войти</button>
        <div className='text-center mt-4'>
          <span className='text-gray-900'>Еще нет аккаунта ? </span>
          <Link
            to={routingName.SIGN_UP}
            className='text-blue-700 underline font-medium'>Регистрация</Link>
        </div>
      </form>
    </div>
  );
};

export default observer(SignIn);
