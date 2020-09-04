import getRegistryUrl from 'registry-url';
import getAuthToken from 'registry-auth-token';

module.exports = scope => {
  const registryUrl = getRegistryUrl(scope);
  const authToken = getAuthToken(registryUrl);
  const authorization = authToken ?
    `${authToken.type} ${authToken.token}` : undefined;

  return {
    registryUrl, authToken, authorization
  };
};
