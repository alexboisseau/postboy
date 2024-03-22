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

const reducers = {
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
};

export default reducers;
