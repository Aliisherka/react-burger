import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { NavLink } from 'react-router-dom';

function AppHeader() {
    const setActive = ({ isActive }: { isActive: boolean }): string => (isActive ? `${styles.link} ${styles.active} text text_type_main-default` : `${styles.link} text text_type_main-default text_color_inactive`);

    return(
        <header className={styles.appHeader}>
            <div className={styles.header}>
                <nav className={styles.firstNavigation}>
                    <ul className={styles.linkList}>
                        <li className='pl-5 pr-5 pt-4 pb-4'>
                            <NavLink to='/' className={setActive} ><BurgerIcon type="primary"/><span className='pl-2'></span>Конструктор</NavLink>
                        </li>
                        <li className='pl-5 pr-5 pt-4 pb-4'>
                            <NavLink to='/feed' className={setActive}><ListIcon type="primary"/><span className='pl-2'></span>Лента заказов</NavLink>
                        </li>
                    </ul>
                </nav>
                <Logo />
                <nav className={styles.secondNavigation}>
                    <ul className={styles.linkList}>
                        <li className='pl-5 pr-5 pt-4 pb-4'>
                            <NavLink to='/profile' className={setActive}><ProfileIcon type="primary"/><span className='pl-2'></span>Личный кабинет</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;