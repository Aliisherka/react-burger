import styles from './Forgot-password.module.css';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import {useRef, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { forgotPassword } from '../services/actions/password';

export function ForgotPassword() {
    const [value, setValue] = useState({email: '', isEmail: false});
    const inputRef = useRef(null);
    const { forgotSuccess } = useSelector(state => state.password);
    const { user } = useSelector(state => state.registration);

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    useEffect(() => {
        {forgotSuccess && navigate('/reset-password')};
    }, [forgotSuccess]);

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const sendMail = () => {
        if (value.isEmail) {
            dispatch(forgotPassword(value.email));
            setValue({...value, isEmail: false})
        }
    }
    
    if (user) {
        return(
            <Navigate to='/' replace />
        )
    }

    return (
            <div className={styles.forgot}>
                <div className={styles.form}>
                    <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setValue({...value, [e.target.name]: e.target.value, isEmail: true})}
                        value={value.email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <Button htmlType="button" type="primary" size="medium" onClick={sendMail}>
                        Восстановить
                    </Button>
                </div>
                <div className={styles.links}>
                    <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
                    <Link className={styles.link + ' text text_type_main-default'} to='/login'>Войти</Link>
                </div>
            </div>
    )
}