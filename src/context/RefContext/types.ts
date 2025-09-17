import type { ModelDropDownListInfoResponse } from '../../api';

export interface RefCotextTypes {
    locs: ModelDropDownListInfoResponse['dep_builds'];
    cargoTypes: ModelDropDownListInfoResponse["cargo_types"];
    trigerReloadRefs: () => void;
}