import styles from './Reset-password.module.css';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import {useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { resetPassword, RETURN_BACK } from '../services/actions/password';

export function ResetPassword() {
    const [value, setValue] = useState({password: '', token: ''})
    const inputRef = useRef(null);
    const { forgotSuccess } = useSelector(state => state.password);

    const dispatch = useDispatch();

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const sendNewPassword = () => {
        dispatch(resetPassword(value));
    }

    const returnToLogin = () => {
        dispatch({type: RETURN_BACK})
    }

    if (!forgotSuccess) {
        return (
            <Navigate to='/forgot-password' replace/>
        )
    }

    return (
            <div className={styles.reset}>
                <div className={styles.form}>
                    <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                    <Input
                        type={'text'}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setValue({...value, [e.target.name]: e.target.value})}
                        value={value.password}
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
                        onChange={e => setValue({...value, [e.target.name]: e.target.value})}
                        value={value.token}
                        name={'token'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <Button htmlType="button" type="primary" size="medium" onClick={sendNewPassword}>
                        Сохранить
                    </Button>
                </div>
                <div className={styles.links}>
                    <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
                    <Link onClick={returnToLogin} className={styles.link + ' text text_type_main-default'} to='/login'>Войти</Link>
                </div>
            </div>
    )
}