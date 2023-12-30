export interface Account {
    username: string;
    password: string;
    token: string;
}

export type AccountDocument = Account & Document;
