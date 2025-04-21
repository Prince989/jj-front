export default {
  meEndpoint: '/auth/profile',
  loginEndpoint: '/auth/login',
  otpLoginEndpoint: '/auth/otp/login',
  registerEndpoint: '/get/profile',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
