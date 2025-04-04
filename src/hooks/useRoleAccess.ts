import { useAuth } from './useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type RoleAccess = {
    hasAccess: boolean
    isLoading: boolean
}

export const useRoleAccess = (allowedRoles: string[]): RoleAccess => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.replace({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            })
        } else if (!loading && user && !allowedRoles.includes(user.role?.name || '')) {
            router.replace('/401')
        }
    }, [user, loading, router, allowedRoles])

    return {
        hasAccess: !loading && !!user && allowedRoles.includes(user.role?.name || ''),
        isLoading: loading
    }
} 