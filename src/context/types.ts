export type ErrCallbackType = (err: { [key: string]: any }) => void

export type LoginParams = {
  phoneNumber: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: {
    name: string
  }
  email: string
  name: string
  phoneNumber: string
  activePlan: {
    text: string,
    app: {
      id: number,
      name: string
    }
  } | null
  expirePlan: string
  usedFreeDays: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
