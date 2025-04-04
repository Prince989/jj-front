/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl'
  else if (role === 'businessUser') return 'admission'
  else return '/dashboard'
}

export default getHomeRoute
