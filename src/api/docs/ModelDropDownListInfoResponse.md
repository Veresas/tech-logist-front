# ModelDropDownListInfoResponse

DTO для передачи списка типов грузов и связей подразделений и зданий

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cargo_types** | **{ [key: string]: string; }** | Мапа типов грузов | [optional] [default to undefined]
**dep_builds** | **{ [key: string]: string; }** | Мапа связей подразделений и зданий | [optional] [default to undefined]

## Example

```typescript
import { ModelDropDownListInfoResponse } from './api';

const instance: ModelDropDownListInfoResponse = {
    cargo_types,
    dep_builds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
