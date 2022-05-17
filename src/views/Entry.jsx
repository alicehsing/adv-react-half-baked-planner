import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEntries } from '../context/PlannerContext';

import styles from './Entry.css';

export default function Entry() {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const { entries, getEntry, updateEntry } = useEntries();
  const [isEditing, setIsEditing] = useState(false);

  let content;

  // useEffect(() => {
  //   setEntry(getEntry(id));
  // }, [id, entries.length]);

  // update useEffect so page refresh when edits are made
  useEffect(() => {
    setEntry(getEntry(id));
  }, [id, entries]);

  if (isEditing) {
    content = (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setIsEditing(false);
        }}
      >
        <input
          type="text"
          name="title"
          aria-label="Edit field"
          value={entry.title}
          placeholder="Plan Something"
          onChange={(e) => updateEntry({ ...entry, title: e.target.value })}
        />
        <textarea
          name="content"
          value={entry.content}
          placeholder="Brief description of what you are planning to do"
          onChange={(e) => updateEntry({ ...entry, content: e.target.value })}
        />
        <button>Save</button>
      </form>
    );
  } else {
    content = (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        aria-label={`Edit${entry.title}`}
      >
        Edit
      </button>
    );
  }

  return (
    <>
      <Link to="/entries" className={styles.backButton}>
        &laquo; Back to Planner
      </Link>

      <article className={styles.entry}>
        <h1>{entry?.title}</h1>
        <p>Due: {entry?.date}</p>
        <p>{entry?.content}</p>
      </article>
      {content}
    </>
  );
}
