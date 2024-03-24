import updateHttpMethod from "./updateHttpMethod";
import updateUrl from "./updateUrl";
import addQueryParameter from "./queryParameters/addQueryParameter";
import updateQueryParameter from "./queryParameters/updateQueryParameter";
import removeQueryParameter from "./queryParameters/removeQueryParameter";
import toggleAllQueryParameters from "./queryParameters/toggleAllQueryParameters";
import addHeader from "./headers/addHeader";
import removeHeader from "./headers/removeHeader";
import updateHeader from "./headers/updateHeader";
import toggleAllHeaders from "./headers/toggleAllHeaders";
import updateAuthorizationType from "./authorization/updateAuthorizationType";
import updateAuthorizationBasic from "./authorization/updateAuthorizationBasic";
import updateAuthorizationBearerToken from "./authorization/updateAuthorizationBearerToken";
import updateAuthorizationApiKey from "./authorization/updateAuthorizationApiKey";
import updateBodyContentType from "./body/updateBodyContentType";
import updateBodyRawLanguage from "./body/raw/updateBodyRawLanguage";
import updateBodyRawValue from "./body/raw/updateBodyRawValue";
import addBodyXWWWFormUrlEncodedRecord from "./body/XWWWFormUrlEncoded/addBodyXWWWFormUrlEncodedRecord";
import updateBodyXWWWFormUrlEncodedRecord from "./body/XWWWFormUrlEncoded/updateBodyXWWWFormUrlEncodedRecord";
import removeBodyXWWWFormUrlEncodedRecord from "./body/XWWWFormUrlEncoded/removeBodyXWWWFormUrlEncodedRecord";
import toggleAllBodyXWwwFormUrlEncodedRecords from "./body/XWWWFormUrlEncoded/toggleAllBodyXWwwFormUrlEncodedRecords";

const reducers = {
  updateHttpMethod,
  updateUrl,
  addQueryParameter,
  updateQueryParameter,
  removeQueryParameter,
  toggleAllQueryParameters,
  addHeader,
  removeHeader,
  updateHeader,
  toggleAllHeaders,
  updateAuthorizationType,
  updateAuthorizationBasic,
  updateAuthorizationBearerToken,
  updateAuthorizationApiKey,
  updateBodyContentType,
  updateBodyRawLanguage,
  updateBodyRawValue,
  addBodyXWWWFormUrlEncodedRecord,
  updateBodyXWWWFormUrlEncodedRecord,
  removeBodyXWWWFormUrlEncodedRecord,
  toggleAllBodyXWwwFormUrlEncodedRecords,
};

export default reducers;
