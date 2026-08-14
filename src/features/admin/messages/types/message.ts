export type ContactMessageStatus = 
    | "NEW"
    | "READ"
    | "CLOSED";

export type AdminContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: ContactMessageStatus;
    createdAt: string;
    updatedAt: string;
};