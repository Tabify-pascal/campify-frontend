export type UserRole =
    | "ADMIN"
    | "CUSTOMER"
    | "MANAGER";
    
export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
};

export type AuthResponse = {
    user: User;
};