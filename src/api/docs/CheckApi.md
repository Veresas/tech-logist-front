# CheckApi

All URIs are relative to *http://localhost:8400/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCheckGet**](#apicheckget) | **GET** /api/check | Проверка подключения к сервису|

# **apiCheckGet**
> ModelCheckResponse apiCheckGet()

Проверка подключения к сервису

### Example

```typescript
import {
    CheckApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CheckApi(configuration);

const { status, data } = await apiInstance.apiCheckGet();
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
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

