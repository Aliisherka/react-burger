import styles from './Profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { NavLink } from 'react-router-dom';
import { logout } from '../services/actions/registration';
import { updateUser } from '../services/actions/registration';
import { useForm } from '../hooks/useForm';

interface IProfilePage {
    isChange: boolean
}

export function ProfilePage() {
    const { user } = useSelector((state) => state.registration);
    const dispatch = useDispatch();
    
    const [buttons, setbuttons] = useState<IProfilePage>({isChange: false})
    const inputRef = useRef<HTMLInputElement>(null)

    const {values, handleChange, setValues} = useForm({name: '', email: '', password: '123456'});

    useEffect(() => {
        user && setValues({name: user.name, email: user.email, password: '123456'})
    }, [user, setValues])

    const onIconClick = (): void => {
        setTimeout(() => inputRef.current && inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const logoutUser = (): void => {
        dispatch(logout());
    }

    const update = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(updateUser(values));
        setbuttons({isChange: false});
    }

    const cancel = (): void => {
        user && setValues({...values, name: user.name, email: user.email, password: '123456'})
        setbuttons({isChange: false})
    }

    return (
            <div className={styles.profile}>
                <nav className={styles.navigation + ' pl-5'}>
                    <ul className={styles.linkList}>
                        <li className={styles.links}>
                            <NavLink to='/profile' className={({ isActive }) =>
    isActive ? `text text_type_main-medium ${styles.active}` : `${styles.link} text text_type_main-medium text_color_inactive`}>Профиль</NavLink>
                        </li>
                        <li className={styles.links}>
                            <NavLink to='/profile/orders' className={({ isActive }) =>
    isActive ? `text text_type_main-medium ${styles.active}` : `${styles.link} text text_type_main-medium text_color_inactive`}>История заказов</NavLink>
                        </li>
                        <li className={styles.links}>
                            <NavLink onClick={logoutUser} to='/login' className={({ isActive }) =>
    isActive ? `text text_type_main-medium ${styles.active}` : `${styles.link} text text_type_main-medium text_color_inactive`}>Выход</NavLink>
                        </li>
                    </ul>
                    <p className='text text_type_main-default text_color_inactive pt-20'>В этом разделе вы можете
    изменить свои персональные данные</p>
                </nav>
                <form onSubmit={update}>
                    <div className={styles.form}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => {
                                handleChange(e)
                                setbuttons({isChange: true})
                            }}
                            icon={'EditIcon'}
                            value={values.name}
                            name={'name'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="ml-1"
                        />
                        <Input
                            type={'text'}
                            placeholder={'Логин'}
                            onChange={e => {
                                handleChange(e)
                                setbuttons({isChange: true})
                            }}
                            icon={'EditIcon'}
                            value={values.email}
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
                            onChange={e => {
                                handleChange(e)
                                setbuttons({isChange: true})
                            }}
                            icon={'EditIcon'}
                            value={values.password}
                            name={'password'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="ml-1"
                        />
                        {buttons.isChange && <div className={styles.buttons}>
                            <Button htmlType="button" type="primary" size="medium" onClick={cancel}>
                                Отмена
                            </Button>
                            <Button htmlType="submit" type="primary" size="medium">
                                Сохранить
                            </Button>
                        </div>}
                    </div>
                </form>
            </div>
    )
}