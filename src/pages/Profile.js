import styles from './Profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import {useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser, logout } from '../services/actions/registration';
import { updateUser } from '../services/actions/registration';

export function ProfilePage() {
    const { user } = useSelector(state => state.registration);
    const dispatch = useDispatch();
    
    const [value, setValue] = useState({name: user.name, email: user.email, password: '123456'})
    const [buttons, setbuttons] = useState({isChange: false})
    const inputRef = useRef(null)

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const logoutUser = () => {
        dispatch(logout());
    }

    const update = (e) => {
        e.preventDefault();
        dispatch(updateUser(value))
        setbuttons({isChange: false})
    }

    const cancel = () => {
        setValue({...value, name: user.name, email: user.email, password: '123456'})
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
                                setValue({...value, [e.target.name]: e.target.value})
                                setbuttons({isChange: true})
                            }}
                            icon={'EditIcon'}
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
                            type={'text'}
                            placeholder={'Логин'}
                            onChange={e => {
                                setValue({...value, [e.target.name]: e.target.value})
                                setbuttons({isChange: true})
                            }}
                            icon={'EditIcon'}
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
                            onChange={e => {
                                setValue({...value, [e.target.name]: e.target.value})
                                setbuttons({isChange: true})
                            }}
                            icon={'EditIcon'}
                            value={value.password}
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