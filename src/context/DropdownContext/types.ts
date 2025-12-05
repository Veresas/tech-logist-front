import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from '../../api/main';

export interface RefCotextTypes {
    locs: GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds'];
    cargoTypes: GithubComVeresusTlApiInternalModelDropDownListInfoResponse["cargo_types"];
    trigerReloadRefs: () => void;
}