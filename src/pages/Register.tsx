import React, { useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'services/hooks';
import { regist } from 'services/actions/registration';
import { useForm } from 'hooks/useForm';

import styles from './Register.module.css';

function RegisterPage() {
  const { user } = useSelector((state) => state.registration);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const { values, handleChange } = useForm({ email: '', password: '', name: '' });

  const onIconClick = (): void => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };

  const registration = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(regist(values));
  };

  if (user) {
    return (
            <Navigate to='/' replace />
    );
  }
  return (
    <div className={styles.register}>
      <form onSubmit={registration}>
        <div className={styles.form}>
          <h2 className='text text_type_main-medium'>Регистрация</h2>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => handleChange(e)}
            value={values.name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => handleChange(e)}
            value={values.email}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={(e) => handleChange(e)}
            icon={'ShowIcon'}
            value={values.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={styles.links}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Link
          className={`${styles.link} text text_type_main-default`}
          to='/login'
        >
          Войти
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
