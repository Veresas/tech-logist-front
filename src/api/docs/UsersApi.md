# UsersApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**usersIdGet**](#usersidget) | **GET** /users/{id} | Получить пользователя|
|[**usersIdPut**](#usersidput) | **PUT** /users/{id} | Обновить пользователя|

# **usersIdGet**
> ModelUser usersIdGet()

Получить пользователя по ID

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; //ID пользователя (default to undefined)

const { status, data } = await apiInstance.usersIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID пользователя | defaults to undefined|


### Return type

**ModelUser**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Пользователь |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdPut**
> { [key: string]: string; } usersIdPut(user)

Обновить пользователя по ID

### Example

```typescript
import {
    UsersApi,
    Configuration,
    ModelUserUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; //ID пользователя (default to undefined)
let user: ModelUserUpdate; //Данные пользователя для обновления

const { status, data } = await apiInstance.usersIdPut(
    id,
    user
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **user** | **ModelUserUpdate**| Данные пользователя для обновления | |
| **id** | [**string**] | ID пользователя | defaults to undefined|


### Return type

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Пользователь успешно обновлён |  -  |
|**400** | Ошибка валидации |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

