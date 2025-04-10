import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]>

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

interface IResource {
  type: string
  [key: string]: any
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string) => {
  const { can, rules, cannot } = new AbilityBuilder(AppAbility)

  switch (role) {
    case 'businessUser':
      // Business user has full access to everything
      can('manage', 'all')
      break

    case 'user':
      // User has access to most pages but not admission
      can('manage', 'all')
      cannot('manage', 'admission')
      break

    default:
      // Default role can only read public resources and access auth pages
      can(['read'], 'public')
      can(['read'], 'auth') // Allow access to auth pages
      break
  }

  return rules
}

export const buildAbilityFor = (role: string): AppAbility => {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: (subject: IResource) => subject.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'read',
  subject: 'public'
}

export default defineRulesFor
