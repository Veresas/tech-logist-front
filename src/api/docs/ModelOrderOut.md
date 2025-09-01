# ModelOrderOut

DTO для передачи информации о заявке

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cargo_description** | **string** |  | [optional] [default to undefined]
**cargo_name** | **string** |  | [optional] [default to undefined]
**cargo_type_name** | **string** |  | [optional] [default to undefined]
**cargo_weight** | **number** |  | [optional] [default to undefined]
**depart_loc_name** | **string** |  | [optional] [default to undefined]
**dispatcher_name** | **string** |  | [optional] [default to undefined]
**driver_name** | **string** |  | [optional] [default to undefined]
**goal_loc_name** | **string** |  | [optional] [default to undefined]
**id** | **number** |  | [optional] [default to undefined]
**is_urgent** | **boolean** |  | [optional] [default to undefined]
**order_status_name** | [**ModelOrderStatusEnum**](ModelOrderStatusEnum.md) |  | [optional] [default to undefined]
**photo_id** | **string** |  | [optional] [default to undefined]
**time** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ModelOrderOut } from './api';

const instance: ModelOrderOut = {
    cargo_description,
    cargo_name,
    cargo_type_name,
    cargo_weight,
    depart_loc_name,
    dispatcher_name,
    driver_name,
    goal_loc_name,
    id,
    is_urgent,
    order_status_name,
    photo_id,
    time,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
