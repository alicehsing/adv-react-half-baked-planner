import styles from './Header.css';
import { useEntries } from '../../context/PlannerContext';

export default function Header() {
  const { entries } = useEntries();
  return (
    <header className={styles.header}>
      <h2>My Planner</h2>
      {/* TODO: Replace hard-coded count with the actual number of entries */}
      <span>{entries.length} Item Left</span>
    </header>
  );
}
