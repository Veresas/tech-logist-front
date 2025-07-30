# AuthApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authLoginPost**](#authloginpost) | **POST** /auth/login | Авторизация|
|[**authLogoutPost**](#authlogoutpost) | **POST** /auth/logout | Выход из аккаунта|
|[**authRegisterPost**](#authregisterpost) | **POST** /auth/register | Регистрация|

# **authLoginPost**
> { [key: string]: string; } authLoginPost(loginRequest)

Авторизация пользователя по логину и паролю

### Example

```typescript
import {
    AuthApi,
    Configuration,
    ModelLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let loginRequest: ModelLoginRequest; //Данные для авторизации

const { status, data } = await apiInstance.authLoginPost(
    loginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | **ModelLoginRequest**| Данные для авторизации | |


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
|**200** | Токен доступа |  -  |
|**401** | Ошибка авторизации |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLogoutPost**
> { [key: string]: string; } authLogoutPost()

Удаляет HttpOnly cookie с токеном доступа и завершает сессию пользователя

### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authLogoutPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Выход выполнен успешно |  -  |
|**500** | Ошибка сервера |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRegisterPost**
> { [key: string]: string; } authRegisterPost(registerRequest)

Регистрация нового пользователя

### Example

```typescript
import {
    AuthApi,
    Configuration,
    ModelRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let registerRequest: ModelRegisterRequest; //Данные для регистрации

const { status, data } = await apiInstance.authRegisterPost(
    registerRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerRequest** | **ModelRegisterRequest**| Данные для регистрации | |


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
|**200** | Пользователь успешно создан |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

