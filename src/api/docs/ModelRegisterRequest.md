# ModelRegisterRequest

DTO для передачи данных регистрации

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**fio** | **string** |  | [optional] [default to undefined]
**login** | **string** |  | [optional] [default to undefined]
**password** | **string** |  | [optional] [default to undefined]
**phone** | **string** |  | [optional] [default to undefined]
**role** | [**ModelRoleStatic**](ModelRoleStatic.md) |  | [optional] [default to undefined]
**role_password** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ModelRegisterRequest } from './api';

const instance: ModelRegisterRequest = {
    fio,
    login,
    password,
    phone,
    role,
    role_password,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
