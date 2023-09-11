import styles from './Register.module.css';


import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { regist } from '../services/actions/registration';


export function RegisterPage() {
    const [value, setValue] = useState({email: '', password: '', name: ''});
    const { user } = useSelector(state => state.registration);
    const inputRef = useRef(null);

    const dispatch = useDispatch();

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const registration = () => {
        dispatch(regist(value));
    }

    if (user) {
        return(
            <Navigate to='/' replace />
        )
    }
    return (
            <div className={styles.register}>
                <div className={styles.form}>
                    <h2 className='text text_type_main-medium'>Регистрация</h2>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setValue({...value, [e.target.name]: e.target.value})}
                        value={value.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
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
                    <Button htmlType="button" type="primary" size="medium" onClick={registration}>
                        Зарегистрироваться
                    </Button>
                </div>
                <div className={styles.links}>
                    <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</p>
                    <Link className={styles.link + ' text text_type_main-default'} to='/login'>Войти</Link>
                </div>
            </div>
    )
}