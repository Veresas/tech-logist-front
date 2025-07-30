# OrdersApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**ordersActualGet**](#ordersactualget) | **GET** /orders/actual | Получить все актуальные заявки|
|[**ordersIdAcceptPost**](#ordersidacceptpost) | **POST** /orders/{id}/accept | Принять заявку|
|[**ordersIdCancelPost**](#ordersidcancelpost) | **POST** /orders/{id}/cancel | Отменить заявку|
|[**ordersIdCompletePost**](#ordersidcompletepost) | **POST** /orders/{id}/complete | Завершить заявку|
|[**ordersIdRejectPost**](#ordersidrejectpost) | **POST** /orders/{id}/reject | Снять заявку с водителя|
|[**ordersPost**](#orderspost) | **POST** /orders | Создать заявку|

# **ordersActualGet**
> Array<ModelOrderOut> ordersActualGet()

Получить все актуальные заявки

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

const { status, data } = await apiInstance.ordersActualGet();
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

# **ordersIdAcceptPost**
> { [key: string]: string; } ordersIdAcceptPost()

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

const { status, data } = await apiInstance.ordersIdAcceptPost(
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

# **ordersIdCancelPost**
> { [key: string]: string; } ordersIdCancelPost()

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

const { status, data } = await apiInstance.ordersIdCancelPost(
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

# **ordersIdCompletePost**
> { [key: string]: string; } ordersIdCompletePost()

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

const { status, data } = await apiInstance.ordersIdCompletePost(
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

# **ordersIdRejectPost**
> { [key: string]: string; } ordersIdRejectPost()

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

const { status, data } = await apiInstance.ordersIdRejectPost(
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

# **ordersPost**
> { [key: string]: string; } ordersPost(order)

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

const { status, data } = await apiInstance.ordersPost(
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

