import registryInfo from 'registry-info';

// returns an object with {registryUrl, authToken, authorization}
//  .authorization can be used in http headers
console.log(registryInfo());

// optionally a scope can be set
console.log(registryInfo(scope));
