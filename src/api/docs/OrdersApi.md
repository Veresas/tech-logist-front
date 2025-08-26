# OrdersApi

All URIs are relative to *http://localhost:8400/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiOrdersActualGet**](#apiordersactualget) | **GET** /api/orders/actual | Получить все актуальные заявки|
|[**apiOrdersIdAcceptPatch**](#apiordersidacceptpatch) | **PATCH** /api/orders/{id}/accept | Принять заявку|
|[**apiOrdersIdCancelPatch**](#apiordersidcancelpatch) | **PATCH** /api/orders/{id}/cancel | Отменить заявку|
|[**apiOrdersIdCompletePatch**](#apiordersidcompletepatch) | **PATCH** /api/orders/{id}/complete | Завершить заявку|
|[**apiOrdersIdGet**](#apiordersidget) | **GET** /api/orders/{id} | Получить заявку по ID|
|[**apiOrdersIdRejectPatch**](#apiordersidrejectpatch) | **PATCH** /api/orders/{id}/reject | Отклонить заявку|
|[**apiOrdersPost**](#apiorderspost) | **POST** /api/orders | Создать новую заявку|

# **apiOrdersActualGet**
> ModelOrdersResponse apiOrdersActualGet()

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

const { status, data } = await apiInstance.apiOrdersActualGet(
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

# **apiOrdersIdAcceptPatch**
> { [key: string]: any; } apiOrdersIdAcceptPatch()

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

const { status, data } = await apiInstance.apiOrdersIdAcceptPatch(
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

# **apiOrdersIdCancelPatch**
> { [key: string]: any; } apiOrdersIdCancelPatch()

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

const { status, data } = await apiInstance.apiOrdersIdCancelPatch(
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

# **apiOrdersIdCompletePatch**
> { [key: string]: any; } apiOrdersIdCompletePatch()

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

const { status, data } = await apiInstance.apiOrdersIdCompletePatch(
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

# **apiOrdersIdGet**
> ModelOrder apiOrdersIdGet()

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

const { status, data } = await apiInstance.apiOrdersIdGet(
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

# **apiOrdersIdRejectPatch**
> { [key: string]: any; } apiOrdersIdRejectPatch()

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

const { status, data } = await apiInstance.apiOrdersIdRejectPatch(
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

# **apiOrdersPost**
> { [key: string]: any; } apiOrdersPost(order)

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

const { status, data } = await apiInstance.apiOrdersPost(
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

