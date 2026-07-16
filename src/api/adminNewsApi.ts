import { adminApi } from "./adminClient";
import type { NewsItem } from "../features/news/types/NewsItem";
import type { NewsFormData } from "../features/admin/news/schemas/newsSchema";

function createNewsFormData(data: NewsFormData){
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("date", data.date);

    const image = data.image?.[0];
    if(image){
        formData.append("image", image);
    }

    return formData;
}

export function createNews(data: NewsFormData){
    return adminApi<NewsItem>("/admin/news", {
        method: "POST",
        body: createNewsFormData(data),
    });
}

export function updateNews(id: string, data: NewsFormData){
    return adminApi<NewsItem>(`/admin/news/${id}`, {
        method: "PUT",
        body: createNewsFormData(data),
    });
}

export function deleteNews(id: string) {
    return adminApi<void>(`/admin/spots/${id}`, {
        method: "DELETE",
    });
}

