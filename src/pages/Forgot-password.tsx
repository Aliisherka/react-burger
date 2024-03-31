/* eslint-disable no-lone-blocks */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from 'services/hooks';

import { forgotPassword } from 'services/actions/password';
import { useForm } from 'hooks/useForm';

import styles from './Forgot-password.module.css';

interface IForgotPassword {
    isEmail: boolean
}

function ForgotPassword() {
  const [state, setState] = useState<IForgotPassword>({ isEmail: false });
  const { forgotSuccess } = useSelector((state) => state.password);
  const { user } = useSelector((state) => state.registration);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    { forgotSuccess && navigate('/reset-password'); }
  }, [forgotSuccess]);

  const { values, handleChange } = useForm({ email: '' });

  const sendMail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (state.isEmail) {
      dispatch(forgotPassword(values.email));
      setState({ isEmail: false });
    }
  };

  if (user) {
    return (
      <Navigate to='/' replace />
    );
  }

  return (
    <div className={styles.forgot}>
      <form onSubmit={sendMail}>
        <div className={styles.form}>
          <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={(e) => {
              handleChange(e);
              setState({ isEmail: true });
            }}
            value={values.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Восстановить
          </Button>
        </div>
      </form>
      <div className={styles.links}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?
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

export default ForgotPassword;
