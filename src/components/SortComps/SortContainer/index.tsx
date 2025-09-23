import { useCallback, useEffect, useMemo, useState } from "react"
import type { SortContainerProp } from "./types"
import { SortModal, } from "../../Modals/SortModal"
import { SearchPlace, FilterTagList } from "../"
import type { tag } from "../types"
import styles from "./sortContainer.module.css"
import { ICON_FILTER } from "../../../../public"
import { usePlatform } from '../../../utils/ContextHooks';

export const SortContainer = ({ Today, Urgent, DepartLoc, GoalLoc, CargoType, 
    setName, setToday, setIsUrgent, setDepartLoc, setGoalLoc, setCargoType } : SortContainerProp) => {

    const [isOpen, setIsOpen] = useState(false)
    const { isMobile } = usePlatform();
    const [filterTags, setFilterTags] = useState<tag[]>([])

    const onClearAll = () => {
        setIsUrgent(undefined);
        setToday(undefined);
        setDepartLoc(undefined);
        setGoalLoc(undefined);
        setCargoType(undefined);
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

        if (DepartLoc !== undefined) {
            newTags.push({
                id: "DepartLoc",
                name: DepartLoc,
                onRemove: () => deleteTag("DepartLoc"),
            });
        }

        if (GoalLoc !== undefined) {
            newTags.push({
                id: "GoalLoc",
                name: GoalLoc,
                onRemove: () => deleteTag("GoalLoc"),
            });
        }

        if (CargoType !== undefined) {
            newTags.push({
                id: "CargoType",
                name: CargoType,
                onRemove: () => deleteTag("CargoType"),
            });
        }
        
        
        setFilterTags(newTags);
    }, [Today, Urgent, CargoType, GoalLoc, DepartLoc, deleteTag]);

    const activeCount = useMemo(() => filterTags.length, [filterTags]);

    return (
        <div className={styles.FiltrContainer}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <SearchPlace setName={setName} />
                </div>
                <button
                    className={styles.filtersButton}
                    onClick={() => setIsOpen(true)}
                >
                    <img src={ICON_FILTER} alt="" />

                    {!isMobile && <span>Фильтры</span>}
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
                departLoc={DepartLoc}
                goalLoc={GoalLoc}
                cargoType={CargoType}
                setToday={setToday}
                setIsUrgent={setIsUrgent}
                setCargoType={setCargoType}
                setDepartLoc={setDepartLoc}
                setGoalLoc={setGoalLoc}
            />

        </div>
    )
}