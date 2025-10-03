# AuthApi

All URIs are relative to *http://localhost:8400/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**publicAuthCheckLoginLoginGet**](#publicauthcheckloginloginget) | **GET** /public/auth/check-login/{login} | Проверка уникальности логина|

# **publicAuthCheckLoginLoginGet**
> boolean publicAuthCheckLoginLoginGet()

Проверяет, существует ли логин в системе

### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let login: string; //Логин для проверки (default to undefined)

const { status, data } = await apiInstance.publicAuthCheckLoginLoginGet(
    login
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **login** | [**string**] | Логин для проверки | defaults to undefined|


### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | true - логин свободен, false - занят |  -  |
|**400** | Некорректный ввод |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

