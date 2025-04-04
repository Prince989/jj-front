import { AbilityBuilder, Ability, Subject } from '@casl/ability'

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
const defineRulesFor = (role: string, subject: string) => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)

  switch (role) {
    case 'businessUser':
      can('manage', 'all') // Admin can do everything
      break

    case 'user':
      can('manage', 'all')
      break

    default:
      can(['read'], 'public') // Default role can only read public resources
      break
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    detectSubjectType: (subject: IResource) => subject.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'read',
  subject: 'public'
}

export default defineRulesFor
