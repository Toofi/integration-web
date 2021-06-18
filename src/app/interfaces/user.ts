export interface User {
    _id?: string,
    username: string,
    firstName: string,
    lastName: string,
    emails: Array<string>,
    password: string
}
