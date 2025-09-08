import { useCallback, useEffect, useMemo, useState } from "react"
import type { SortContainerProp } from "./types"
import { SortModal, } from "../../Modals/SortModal"
import { SearchPlace, FilterTagList } from "../"
import type { tag } from "../types"
import styles from "./sortContainer.module.css"
import { ICON_FILTER } from "../../../../public"

export const SortContainer = ({ Today, Urgent, setName, setToday, setIsUrgent} : SortContainerProp) => {
    const [isOpen, setIsOpen] = useState(false)
    const [filterTags, setFilterTags] = useState<tag[]>([])

    const onClearAll = () => {
        setIsUrgent(undefined);
        setToday(undefined)
    }

    const deleteTag = useCallback((id: string) => {
        switch (id) {
            case "Today":
                setToday(undefined);
                break;
            case "Urgent":
                setIsUrgent(undefined)
                break;
        }
    }, [setToday, setIsUrgent])

    useEffect(() => {
        const newTags: tag[] = [];
        
        if (Today !== undefined) {
            newTags.push({
                id: "Today",
                name: Today ? "сегодня" : "завтра",
                onRemove: () => deleteTag("Today"),
            });
        }
        
        if (Urgent !== undefined) {
            newTags.push({
                id: "Urgent",
                name: Urgent ? "срочно" : "не срочно",
                onRemove: () => deleteTag("Urgent"),
            });
        }
        
        setFilterTags(newTags);
    }, [Today, Urgent, deleteTag]);

    const activeCount = useMemo(() => filterTags.length, [filterTags]);

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <SearchPlace setName={setName} />
                </div>
                <button
                    className={styles.filtersButton}
                    onClick={() => setIsOpen(true)}
                >
                    <img src={ICON_FILTER} alt="" />
                    <span>Фильтры</span>
                    <span className={styles.badge}>{activeCount}</span>
                </button>
            </div>

            <FilterTagList
                tags={filterTags}
                onClearAll={onClearAll}
            />
            
            <SortModal 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                today={Today}
                isUrgent={Urgent}
                setToday={setToday}
                setIsUrgent={setIsUrgent}
            />

        </div>
    )
}