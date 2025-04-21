import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ValidationWizard from 'src/components/validation/validation'

function Validation() {
  return (
    <div>
      <ValidationWizard />
    </div>
  )
}

Validation.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Validation.guestGuard = true

export default Validation;