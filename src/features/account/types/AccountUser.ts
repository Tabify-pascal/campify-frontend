import { string } from "zod"

export type AccountUser = {
    id: string;
    name: string | null;
    email: string;
    role: "customer";
};