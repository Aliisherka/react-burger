import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return(
        <header className={styles.appHeader}>
            <div className={styles.header}>
                <nav className={styles.firstNavigation}>
                    <ul className={styles.linkList}>
                        <li className='pl-5 pr-5 pt-4 pb-4'>
                            <a className={styles.link + ' text text_type_main-default'}><BurgerIcon type="primary"/><span className='pl-2'></span>Конструктор</a>
                        </li>
                        <li className='pl-5 pr-5 pt-4 pb-4'>
                            <a className={styles.link + ' text text_type_main-default text_color_inactive'}><ListIcon type="secondary"/><span className='pl-2'></span>Лента заказов</a>
                        </li>
                    </ul>
                </nav>
                <Logo />
                <nav className={styles.secondNavigation}>
                    <ul className={styles.linkList}>
                        <li className='pl-5 pr-5 pt-4 pb-4'>
                            <a className={styles.link + ' text text_type_main-default text_color_inactive'}><ProfileIcon type="secondary"/><span className='pl-2'></span>Личный кабинет</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;