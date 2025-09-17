import type { FilterTagListProps } from "./types";
import styles from "./FilterTagList.module.css";


export const FilterTagList = ({ 
    tags, 
    onClearAll 
}: FilterTagListProps) => {
    if (tags.length === 0) return null;
    
    return (
        <div className={styles.activeFilters}>
            {tags.map(tag => (
                <div key={tag.id} className={styles.filterTag}>
                    <span className={styles.tagText}>{tag.name}</span>
                    <div className={styles.closeButtonArea}> 
                        <span className={styles.closeButton} 
                            onClick={tag.onRemove}
                            aria-label={`Удалить фильтр ${tag.name}`}
                        >
                            x
                        </span>
                    </div>
                </div>
            ))}
            {onClearAll && (
                <button 
                    className={styles.clearAllButton} 
                    onClick={onClearAll}
                >
                    Очистить все
                </button>
            )}
        </div>
    );
};