import { ReactNode } from 'react'
import { useRoleAccess } from 'src/hooks/useRoleAccess'
import Spinner from 'src/@core/components/spinner'
import UserLayout from 'src/layouts/UserLayout'

const AdmissionPage = () => {
  const { hasAccess, isLoading } = useRoleAccess(['businessUser'])

  if (isLoading) {
    return <Spinner />
  }

  if (!hasAccess) {
    return null // Will be redirected by the hook
  }

  return (
    <div>
      <h1>Admission Page</h1>
      <p>This page is only accessible to business users</p>
      {/* Add your admission page content here */}
    </div>
  )
}

// Use the default user layout
AdmissionPage.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

// Set auth guard to true since this is a protected route
AdmissionPage.authGuard = true
AdmissionPage.guestGuard = false

export default AdmissionPage
