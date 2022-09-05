import styles from './notification.module.css';

/* eslint-disable-next-line */
export interface NotificationProps {}

export function Notification(props: NotificationProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Notification!</h1>
    </div>
  );
}

export default Notification;
