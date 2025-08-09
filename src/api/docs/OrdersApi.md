# OrdersApi

All URIs are relative to *http://localhost:8400/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**secureOrderAcceptIdPut**](#secureorderacceptidput) | **PUT** /secure/order/accept/:id | Принять заявку|
|[**secureOrderActualGet**](#secureorderactualget) | **GET** /secure/order/actual | Получить все актуальные заявки|
|[**secureOrderActualPrivateGet**](#secureorderactualprivateget) | **GET** /secure/order/actual/private | Получить все актуальные заявки пользователя|
|[**secureOrderCancelIdPut**](#secureordercancelidput) | **PUT** /secure/order/cancel/:id | Отменить заявку|
|[**secureOrderCompleteIdPut**](#secureordercompleteidput) | **PUT** /secure/order/complete/:id | Завершить заявку|
|[**secureOrderCreatePost**](#secureordercreatepost) | **POST** /secure/order/create | Создать заявку|
|[**secureOrderRejectIdPut**](#secureorderrejectidput) | **PUT** /secure/order/reject/:id | Снять заявку с водителя|

# **secureOrderAcceptIdPut**
> { [key: string]: string; } secureOrderAcceptIdPut()

Принять заявку по ID

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //ID заявки (default to undefined)

const { status, data } = await apiInstance.secureOrderAcceptIdPut(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID заявки | defaults to undefined|


### Return type

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Заказ принят |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **secureOrderActualGet**
> Array<ModelOrderOut> secureOrderActualGet()

Получить все актуальные заявки

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

const { status, data } = await apiInstance.secureOrderActualGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ModelOrderOut>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Список заявок |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **secureOrderActualPrivateGet**
> Array<ModelOrderOut> secureOrderActualPrivateGet()

Получить все актуальные заявки пользователя

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

const { status, data } = await apiInstance.secureOrderActualPrivateGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ModelOrderOut>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Список заявок |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **secureOrderCancelIdPut**
> { [key: string]: string; } secureOrderCancelIdPut()

Отменяет заявку по ID

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //ID заявки (default to undefined)

const { status, data } = await apiInstance.secureOrderCancelIdPut(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID заявки | defaults to undefined|


### Return type

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Заказ отменён |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **secureOrderCompleteIdPut**
> { [key: string]: string; } secureOrderCompleteIdPut()

Завершает заявку по ID

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //ID заявки (default to undefined)

const { status, data } = await apiInstance.secureOrderCompleteIdPut(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID заявки | defaults to undefined|


### Return type

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Заказ завершён |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **secureOrderCreatePost**
> { [key: string]: string; } secureOrderCreatePost(order)

Создаёт новую заявку

### Example

```typescript
import {
    OrdersApi,
    Configuration,
    ModelOrderCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let order: ModelOrderCreate; //Данные заявки

const { status, data } = await apiInstance.secureOrderCreatePost(
    order
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **order** | **ModelOrderCreate**| Данные заявки | |


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
|**200** | Заказ создан |  -  |
|**400** | Ошибка валидации |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **secureOrderRejectIdPut**
> { [key: string]: string; } secureOrderRejectIdPut()

Снять заявку с водителя по ID

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //ID заявки (default to undefined)

const { status, data } = await apiInstance.secureOrderRejectIdPut(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID заявки | defaults to undefined|


### Return type

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Заказ снят |  -  |
|**500** | Внутренняя ошибка |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

