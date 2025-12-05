import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from "../../../api/main";

export interface OrderListContainerProps {
    isPrivate: boolean,
    locationOptions: GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds'],
    cargoTypeOptions: GithubComVeresusTlApiInternalModelDropDownListInfoResponse['cargo_types']
}