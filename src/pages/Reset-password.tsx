import styles from './Reset-password.module.css';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import React, {useRef} from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { Link, Navigate } from 'react-router-dom';
import { resetPassword, RETURN_BACK } from '../services/actions/password';
import { useForm } from '../hooks/useForm';

export function ResetPassword() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { forgotSuccess } = useSelector((state) => state.password);

    const dispatch = useDispatch();

    const {values, handleChange} = useForm({password: '', token: ''});

    const onIconClick = (): void => {
        setTimeout(() => inputRef.current && inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const sendNewPassword = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(resetPassword(values));
    }

    const returnToLogin = (): void => {
        dispatch({type: RETURN_BACK})
    }

    if (!forgotSuccess) {
        return (
            <Navigate to='/forgot-password' replace/>
        )
    }

    return (
            <div className={styles.reset}>
                <form onSubmit={sendNewPassword}>
                    <div className={styles.form}>
                        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                        <Input
                            type={'text'}
                            placeholder={'Введите новый пароль'}
                            onChange={e => handleChange(e)}
                            value={values.password}
                            name={'password'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="ml-1"
                            icon={'ShowIcon'}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={e => handleChange(e)}
                            value={values.token}
                            name={'token'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="ml-1"
                        />
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
                <div className={styles.links}>
                    <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
                    <Link onClick={returnToLogin} className={styles.link + ' text text_type_main-default'} to='/login'>Войти</Link>
                </div>
            </div>
    )
}