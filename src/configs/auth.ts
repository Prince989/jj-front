export default {
  meEndpoint: '/auth/profile',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/get/profile',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
