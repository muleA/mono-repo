import styles from './entity-list.module.css';

/* eslint-disable-next-line */
export interface EntityListProps {}

export function EntityList(props: EntityListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EntityList!</h1>
    </div>
  );
}

export default EntityList;
