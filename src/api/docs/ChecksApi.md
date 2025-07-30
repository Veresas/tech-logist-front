# ChecksApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**secureCheckGet**](#securecheckget) | **GET** /secure/check | Проверка авторизации|

# **secureCheckGet**
> ModelCheckResponse secureCheckGet()

Проверка актуальности авторизации перед доступом к защищённым страницам

### Example

```typescript
import {
    ChecksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChecksApi(configuration);

const { status, data } = await apiInstance.secureCheckGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelCheckResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Токен валиден |  -  |
|**401** | Ошибка авторизации |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

