export interface User {
    username: string,
    firstName: string,
    lastName: string,
    emails: string | Array<string>,
    password: string
}
