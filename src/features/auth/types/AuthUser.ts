export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: "admin";
};

export type AuthResponse = {
    user: AuthUser;
};