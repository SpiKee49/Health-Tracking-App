export type User = {
    userID: number
    username: string
    userpassword: string
    email: string
    weight: number
    height: number
}

export type Activity = {
    methodID: number
    methodName: string
    methodDesc: string
}

export type UserContextType = {
    user?: User | null
    setUser: (value: User | null) => void
}
