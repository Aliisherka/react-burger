import React from 'react';
import styles from './header.module.css'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon, ListIcon, ProfileIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'


class Header extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <nav className={styles.content + ' pb-4 pt-4'}>
                    <div className={styles.icons}>
                        <a href='#' className={styles.icon + ' pl-5'} style={{color: 'white'}}>
                            <BurgerIcon type="primary"/>
                            <p className='text text_type_main-default pl-2 pr-5'>Конструктор</p>
                        </a>
                        <a href='#' className={styles.icon + ' pl-5'}>
                            <ListIcon type="secondary" />
                            <p className='text text_type_main-default text_color_inactive pl-2 pr-5'>Лента заказов</p>
                        </a>
                    </div>
                    <Logo/>
                    <a href='#' className={styles.icon + ' pl-5'}>
                        <ProfileIcon type="secondary" />        
                        <p className='text text_type_main-default text_color_inactive pl-2 pr-5'>Личный кабинет</p>
                    </a>
                </nav>
            </header>
        )
    }
}

export default Header;