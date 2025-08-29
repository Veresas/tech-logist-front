# OrdersApi

All URIs are relative to *http://localhost:8400/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**ordersActualGet**](#ordersactualget) | **GET** /orders/actual | Получить все актуальные заявки|
|[**ordersCreatePost**](#orderscreatepost) | **POST** /orders/create | Создать новую заявку|
|[**ordersIdAcceptPatch**](#ordersidacceptpatch) | **PATCH** /orders/{id}/accept | Принять заявку|
|[**ordersIdCancelPatch**](#ordersidcancelpatch) | **PATCH** /orders/{id}/cancel | Отменить заявку|
|[**ordersIdCompletePatch**](#ordersidcompletepatch) | **PATCH** /orders/{id}/complete | Завершить заявку|
|[**ordersIdGet**](#ordersidget) | **GET** /orders/{id} | Получить заявку по ID|
|[**ordersIdRejectPatch**](#ordersidrejectpatch) | **PATCH** /orders/{id}/reject | Отклонить заявку|
|[**ordersPhotoIdDelete**](#ordersphotoiddelete) | **DELETE** /orders/photo/{id} | Удалить фотографию|
|[**ordersPhotoIdGet**](#ordersphotoidget) | **GET** /orders/photo/{id} | Получить файл фотографии|
|[**ordersPhotoUploadPost**](#ordersphotouploadpost) | **POST** /orders/photo/upload | Загрузить фотографию|

# **ordersActualGet**
> ModelOrdersResponse ordersActualGet()

Возвращает список всех актуальных заявок

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let isPrivate: boolean; //Приватные заявки (optional) (default to false)

const { status, data } = await apiInstance.ordersActualGet(
    isPrivate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **isPrivate** | [**boolean**] | Приватные заявки | (optional) defaults to false|


### Return type

**ModelOrdersResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Список актуальных заявок |  -  |
|**500** | Ошибка получения заявок |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersCreatePost**
> { [key: string]: any; } ordersCreatePost(order)

Создает новую заявку в системе

### Example

```typescript
import {
    OrdersApi,
    Configuration,
    ModelOrderCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let order: ModelOrderCreate; //Данные для создания заявки

const { status, data } = await apiInstance.ordersCreatePost(
    order
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **order** | **ModelOrderCreate**| Данные для создания заявки | |


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
|**201** | Заявка успешно создана |  -  |
|**400** | Неверные данные заявки |  -  |
|**500** | Ошибка создания заявки |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersIdAcceptPatch**
> { [key: string]: any; } ordersIdAcceptPatch()

Принимает заявку водителем

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: number; //ID заявки (default to undefined)

const { status, data } = await apiInstance.ordersIdAcceptPatch(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID заявки | defaults to undefined|


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
|**200** | Заявка успешно принята |  -  |
|**400** | Неверный формат ID |  -  |
|**404** | Заявка не найдена |  -  |
|**500** | Ошибка принятия заявки |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersIdCancelPatch**
> { [key: string]: any; } ordersIdCancelPatch()

Отменяет заявку

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: number; //ID заявки (default to undefined)

const { status, data } = await apiInstance.ordersIdCancelPatch(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID заявки | defaults to undefined|


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
|**200** | Заявка успешно отменена |  -  |
|**400** | Неверный формат ID |  -  |
|**404** | Заявка не найдена |  -  |
|**500** | Ошибка отмены заявки |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersIdCompletePatch**
> { [key: string]: any; } ordersIdCompletePatch()

Завершает заявку

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: number; //ID заявки (default to undefined)

const { status, data } = await apiInstance.ordersIdCompletePatch(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID заявки | defaults to undefined|


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
|**200** | Заявка успешно завершена |  -  |
|**400** | Неверный формат ID |  -  |
|**404** | Заявка не найдена |  -  |
|**500** | Ошибка завершения заявки |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersIdGet**
> ModelOrder ordersIdGet()

Возвращает информацию о заявке по её ID

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: number; //ID заявки (default to undefined)

const { status, data } = await apiInstance.ordersIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID заявки | defaults to undefined|


### Return type

**ModelOrder**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Информация о заявке |  -  |
|**400** | Неверный формат ID |  -  |
|**404** | Заявка не найдена |  -  |
|**500** | Ошибка получения заявки |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersIdRejectPatch**
> { [key: string]: any; } ordersIdRejectPatch()

Отклоняет заявку водителем

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: number; //ID заявки (default to undefined)

const { status, data } = await apiInstance.ordersIdRejectPatch(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID заявки | defaults to undefined|


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
|**200** | Заявка успешно отклонена |  -  |
|**400** | Неверный формат ID |  -  |
|**404** | Заявка не найдена |  -  |
|**500** | Ошибка отклонения заявки |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersPhotoIdDelete**
> { [key: string]: any; } ordersPhotoIdDelete()

Удаляет фотографию из системы

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //UUID фотографии (default to undefined)

const { status, data } = await apiInstance.ordersPhotoIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | UUID фотографии | defaults to undefined|


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
|**200** | Фотография успешно удалена |  -  |
|**400** | Неверный формат UUID |  -  |
|**500** | Ошибка удаления фотографии |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersPhotoIdGet**
> File ordersPhotoIdGet()

Отдает файл фотографии по UUID

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //UUID фотографии (default to undefined)

const { status, data } = await apiInstance.ordersPhotoIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | UUID фотографии | defaults to undefined|


### Return type

**File**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: image/*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Файл фотографии |  -  |
|**400** | Неверный формат UUID |  -  |
|**404** | Фотография не найдена |  -  |
|**500** | Ошибка получения файла |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ordersPhotoUploadPost**
> { [key: string]: any; } ordersPhotoUploadPost()

Загружает фотографию в систему

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let photo: File; //Фотография (default to undefined)

const { status, data } = await apiInstance.ordersPhotoUploadPost(
    photo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **photo** | [**File**] | Фотография | defaults to undefined|


### Return type

**{ [key: string]: any; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Фотография успешно загружена |  -  |
|**400** | Неверный формат файла |  -  |
|**500** | Ошибка загрузки фотографии |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

