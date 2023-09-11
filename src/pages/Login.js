import styles from './Login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import {useRef, useState, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router";
import { Link, Navigate } from 'react-router-dom';

import { login } from '../services/actions/registration';

export function LoginPage() {
    const [value, setValue] = useState({email: '', password: ''});
    const inputRef = useRef(null);
    const { user } = useSelector(state => state.registration);
    const {state} = useLocation();

    const dispatch = useDispatch();

    
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    
    const loginUser = () => {
        dispatch(login(value))
    }
    
    if (user) {
        return(
            <Navigate to={state || '/'} replace />
        )
    }

    return (
            <div className={styles.login}>
                <div className={styles.form}>
                    <h2 className='text text_type_main-medium'>Вход</h2>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setValue({...value, [e.target.name]: e.target.value})}
                        value={value.email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => setValue({...value, [e.target.name]: e.target.value})}
                        icon={'ShowIcon'}
                        value={value.password}
                        name={'password'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <Button htmlType="button" type="primary" size="medium" onClick={loginUser}>
                        Войти
                    </Button>
                </div>
                <div className={styles.text}>
                    <div className={styles.links}>
                        <p className='text text_type_main-default text_color_inactive'>Вы — новый пользователь?</p>
                        <Link className={styles.link + ' text text_type_main-default'} to='/register'>Зарегистрироваться</Link>
                    </div>
                    <div className={styles.links}>
                        <p className='text text_type_main-default text_color_inactive'>Забыли пароль?</p>
                        <Link className={styles.link + ' text text_type_main-default'} to='/forgot-password'>Восстановить пароль</Link>
                    </div>
                </div>
            </div>
    )
}