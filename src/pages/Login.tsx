import styles from './Login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import {useRef} from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { useLocation } from "react-router";
import { Link, Navigate } from 'react-router-dom';

import { login } from '../services/actions/registration';
import { useForm } from '../hooks/useForm';

export function LoginPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { user } = useSelector((state) => state.registration);
    const {state} = useLocation();

    const dispatch = useDispatch();

    const {values, handleChange} = useForm({email: '', password: ''});
    
    const onIconClick = (): void => {
        setTimeout(() => inputRef.current && inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    
    const loginUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(login(values))
    }
    
    if (user) {
        return(
            <Navigate to={state ? state.from : '/'} replace /> 
        )
    }

    return (
            <div className={styles.login}>
                <form onSubmit={loginUser}>
                    <div className={styles.form}>
                        <h2 className='text text_type_main-medium'>Вход</h2>
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={e => handleChange(e)}
                            value={values.email}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="ml-1"
                        />
                        <Input
                            type={'password'}
                            placeholder={'Пароль'}
                            onChange={e => handleChange(e)}
                            icon={'ShowIcon'}
                            value={values.password}
                            name={'password'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="ml-1"
                        />
                        <Button htmlType="submit" type="primary" size="medium">
                            Войти
                        </Button>
                    </div>
                </form>
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