import styles from './Profile-orders.module.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../services/actions/registration';
import { useDispatch, useSelector } from '../services/hooks';
import CardOrder from '../components/CardOrder/CardOrder';
import { IOrder } from '../services/types/data';

export function ProfileOrdersPage() {
    const { ownOrder} = useSelector(store => store.ws);
    const dispatch = useDispatch();

    const logoutUser = (): void => {
        dispatch(logout());
    }

    return (
        <div className={styles.profileOrders}>
                <nav className={styles.navigation + ' pt-20'}>
                    <ul className={styles.linkList}>
                        <li className={styles.links}>
                            <NavLink to='/profile/' className={({ isActive }) =>
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
                <div className={styles.order}>
                    {ownOrder && ownOrder.orders.map((orders: IOrder) => {
                        return <CardOrder orders={orders} key={orders._id} link={'profile/orders'} status={true}/>
                    })}
                </div>
        </div>
    )
}