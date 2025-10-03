# IdentityApi

All URIs are relative to *http://localhost:8400/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**identUsersIdGet**](#identusersidget) | **GET** /ident/users/{id} | Получить пользователя по ID|
|[**identUsersIdPatch**](#identusersidpatch) | **PATCH** /ident/users/{id} | Обновить данные пользователя|
|[**publicAuthCheckLoginLoginGet**](#publicauthcheckloginloginget) | **GET** /public/auth/check-login/{login} | Проверка уникальности логина|
|[**publicAuthLoginPost**](#publicauthloginpost) | **POST** /public/auth/login | Входит в систему|
|[**publicAuthLogoutPost**](#publicauthlogoutpost) | **POST** /public/auth/logout | Выходит из системы|
|[**publicAuthRegisterPost**](#publicauthregisterpost) | **POST** /public/auth/register | Зарегистрировать нового пользователя|

# **identUsersIdGet**
> ModelTLIdentetyModelUser identUsersIdGet()

Возвращает информацию о пользователе по его ID (int или UUID)

### Example

```typescript
import {
    IdentityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IdentityApi(configuration);

let id: string; //ID пользователя (число или UUID) (default to undefined)

const { status, data } = await apiInstance.identUsersIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID пользователя (число или UUID) | defaults to undefined|


### Return type

**ModelTLIdentetyModelUser**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Информация о пользователе |  -  |
|**400** | Неверный формат ID |  -  |
|**404** | Пользователь не найден |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **identUsersIdPatch**
> { [key: string]: any; } identUsersIdPatch(user)

Обновляет информацию о пользователе по его ID (int или UUID)

### Example

```typescript
import {
    IdentityApi,
    Configuration,
    ModelUserUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new IdentityApi(configuration);

let id: string; //ID пользователя (число или UUID) (default to undefined)
let user: ModelUserUpdate; //Данные для обновления

const { status, data } = await apiInstance.identUsersIdPatch(
    id,
    user
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **user** | **ModelUserUpdate**| Данные для обновления | |
| **id** | [**string**] | ID пользователя (число или UUID) | defaults to undefined|


### Return type

**{ [key: string]: any; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Пользователь успешно обновлен |  -  |
|**400** | Неверный формат ID |  -  |
|**404** | Пользователь не найден |  -  |
|**500** | Ошибка обновления пользователя |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **publicAuthCheckLoginLoginGet**
> boolean publicAuthCheckLoginLoginGet()

Проверяет, существует ли логин в системе

### Example

```typescript
import {
    IdentityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IdentityApi(configuration);

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

# **publicAuthLoginPost**
> { [key: string]: any; } publicAuthLoginPost(user)

Входит в систему

### Example

```typescript
import {
    IdentityApi,
    Configuration,
    ModelLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IdentityApi(configuration);

let user: ModelLoginRequest; //Данные для входа

const { status, data } = await apiInstance.publicAuthLoginPost(
    user
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **user** | **ModelLoginRequest**| Данные для входа | |


### Return type

**{ [key: string]: any; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Пользователь успешно введен |  -  |
|**400** | Неверные данные пользователя |  -  |
|**500** | Ошибка входа в систему |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **publicAuthLogoutPost**
> { [key: string]: any; } publicAuthLogoutPost()

Выходит из системы

### Example

```typescript
import {
    IdentityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IdentityApi(configuration);

const { status, data } = await apiInstance.publicAuthLogoutPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: any; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Пользователь успешно вышел |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **publicAuthRegisterPost**
> { [key: string]: any; } publicAuthRegisterPost(user)

Создает нового пользователя в системе

### Example

```typescript
import {
    IdentityApi,
    Configuration,
    ModelRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IdentityApi(configuration);

let user: ModelRegisterRequest; //Данные для регистрации

const { status, data } = await apiInstance.publicAuthRegisterPost(
    user
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **user** | **ModelRegisterRequest**| Данные для регистрации | |


### Return type

**{ [key: string]: any; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Пользователь успешно создан |  -  |
|**400** | Неверные данные пользователя |  -  |
|**500** | Ошибка создания пользователя |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

