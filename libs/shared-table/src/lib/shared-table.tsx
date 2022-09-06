import styles from './shared-table.module.css';

/* eslint-disable-next-line */
export interface SharedTableProps {}

export function SharedTable(props: SharedTableProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedTable!</h1>
    </div>
  );
}

export default SharedTable;
