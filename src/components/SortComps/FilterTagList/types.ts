import type { tag } from "../types"

export interface FilterTagListProps {
    tags: tag[];
    onClearAll?: () => void;
}