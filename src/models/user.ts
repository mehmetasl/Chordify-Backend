export type User = {
    id: number;
    username: string;
    email: string;
    password: string; // Gerçek projede hash kullanacağız
};

export const users: User[] = [];
