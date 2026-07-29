import { useQuery } from "@tanstack/react-query";
import { getAdminFaqById } from "../../../../api/adminFaqApi";

export function useAdminFaq(faqId: string | undefined) {
    return useQuery({
        queryKey: ["admin", "faqs", faqId],
        queryFn: () => {
            if (!faqId) {
                throw new Error("Faq ID is required");
            }

            return getAdminFaqById(faqId);
        },
        enabled: !!faqId,
    });
}
