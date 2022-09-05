import styles from './delete-confirmation.module.css';

/* eslint-disable-next-line */
export interface DeleteConfirmationProps {}

export function DeleteConfirmation(props: DeleteConfirmationProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DeleteConfirmation!</h1>
    </div>
  );
}

export default DeleteConfirmation;
