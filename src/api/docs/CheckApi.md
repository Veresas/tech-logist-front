# CheckApi

All URIs are relative to *http://localhost:8400/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**checkGet**](#checkget) | **GET** /check | Проверка подключения к сервису|

# **checkGet**
> GithubComVeresusTlApiInternalModelCheckResponse checkGet()

Проверка подключения к сервису

### Example

```typescript
import {
    CheckApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CheckApi(configuration);

let isName: boolean; //Если true — вернуть имя пользователя (optional) (default to undefined)

const { status, data } = await apiInstance.checkGet(
    isName
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **isName** | [**boolean**] | Если true — вернуть имя пользователя | (optional) defaults to undefined|


### Return type

**GithubComVeresusTlApiInternalModelCheckResponse**

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

