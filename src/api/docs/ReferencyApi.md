# ReferencyApi

All URIs are relative to *http://localhost:8400/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**refDropdownListInfoGet**](#refdropdownlistinfoget) | **GET** /ref/dropdown-list-info | Возвращает список типов грузов и связей подразделений и зданий|

# **refDropdownListInfoGet**
> ModelDropDownListInfoResponse refDropdownListInfoGet()

Возвращает список типов грузов и связей подразделений и зданий

### Example

```typescript
import {
    ReferencyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReferencyApi(configuration);

const { status, data } = await apiInstance.refDropdownListInfoGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelDropDownListInfoResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

