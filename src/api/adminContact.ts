import { adminApi } from "./adminClient";
import type { ContactMessageStatus, AdminContactMessage } from "../features/admin/messages/types/message";

export function getContactMessages(){
    return adminApi<AdminContactMessage[]>(`/admin/messages`);
}

export function getContactMessage(messageId: string){
    return adminApi<AdminContactMessage>(`/admin/messages/${messageId}`);
} 

export function updateAdminMessageStatus(
    messageId: string,
    status: ContactMessageStatus,
) {
    return adminApi<AdminContactMessage>(
        `/admin/messages/${messageId}/status`,
        {
            method: "PATCH",
            body: JSON.stringify({ status}),
        }
    );
}

export function deleteAdminMessage(messageId: string){
    return adminApi<void>(`/admin/messages/${messageId}`, {
        method: "DELETE",
    });
}
