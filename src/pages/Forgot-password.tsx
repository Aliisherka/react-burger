import styles from './Forgot-password.module.css';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import {useRef, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { forgotPassword } from '../services/actions/password';
import { useForm } from '../hooks/useForm';

interface IForgotPassword {
    isEmail: boolean
}

export function ForgotPassword() {
    const [state, setState] = useState<IForgotPassword>({isEmail: false});
    const { forgotSuccess } = useSelector((state: any) => state.password);
    const { user } = useSelector((state: any) => state.registration);

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    useEffect(() => {
        {forgotSuccess && navigate('/reset-password')};
    }, [forgotSuccess]);

    const {values, handleChange} = useForm({email: ''});

    const sendMail = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (state.isEmail) {
            forgotPassword(values.email)(dispatch);
            setState({isEmail: false})
        }
    }
    
    if (user) {
        return(
            <Navigate to='/' replace />
        )
    }

    return (
            <div className={styles.forgot}>
                <form onSubmit={sendMail}>
                    <div className={styles.form}>
                        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                        <Input
                            type={'email'}
                            placeholder={'Укажите e-mail'}
                            onChange={e => {
                                handleChange(e)
                                setState({isEmail: true})
                            }}
                            value={values.email}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="ml-1"
                        />
                        <Button htmlType="submit" type="primary" size="medium">
                            Восстановить
                        </Button>
                    </div>
                </form>
                <div className={styles.links}>
                    <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
                    <Link className={styles.link + ' text text_type_main-default'} to='/login'>Войти</Link>
                </div>
            </div>
    )
}