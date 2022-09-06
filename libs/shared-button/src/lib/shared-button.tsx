import styles from './shared-button.module.css';

/* eslint-disable-next-line */
export interface SharedButtonProps {}

export function SharedButton(props: SharedButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedButton!</h1>
    </div>
  );
}

export default SharedButton;
