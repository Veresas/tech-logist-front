# ModelOrderCreate

DTO для создания заявки

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cargo_description** | **string** |  | [optional] [default to undefined]
**cargo_name** | **string** |  | [optional] [default to undefined]
**cargo_type_id** | **number** |  | [optional] [default to undefined]
**cargo_weight** | **number** |  | [optional] [default to undefined]
**depart_loc** | **number** |  | [optional] [default to undefined]
**goal_loc** | **number** |  | [optional] [default to undefined]
**is_urgent** | **boolean** |  | [optional] [default to undefined]
**photo_id** | **string** |  | [optional] [default to undefined]
**time** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ModelOrderCreate } from './api';

const instance: ModelOrderCreate = {
    cargo_description,
    cargo_name,
    cargo_type_id,
    cargo_weight,
    depart_loc,
    goal_loc,
    is_urgent,
    photo_id,
    time,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
