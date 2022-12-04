export type User = {
    userID: number
    username: string
    userpassword: string
    email: string
    age: number
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

export type LogType = {
    id: number
    added_date: string
    steps: number
    weight: number
    heartBeat: number
    userID: number
    methodID: number
}
