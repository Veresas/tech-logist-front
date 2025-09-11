import type {FilterTagProps} from "./types";
import styles from "./FilterTag.module.css";

export const FilterTag = ({ name, onRemove }: FilterTagProps) => {
  return (
    <div className={styles.filterTag}>
      <span className={styles.tagText}>{name}</span>
      <button 
        className={styles.closeButton} 
        onClick={onRemove}
        aria-label="Удалить фильтр"
      >
        ×
      </button>
    </div>
  );
};