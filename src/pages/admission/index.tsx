import React from 'react'
import AdmissionComponent from 'src/components/admission'

export default function Admission() {
  return (
    <div>
      <AdmissionComponent />
    </div>
  )
}

Admission.authGuard = true
Admission.guestGuard = false

Admission.acl = {
  action: 'manage',
  subject: 'admission'
}