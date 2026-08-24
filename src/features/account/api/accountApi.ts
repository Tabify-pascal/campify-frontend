import { api } from "../../../api/client";

import type { AccountUser } from "../types/AccountUser";
import type { AccountReservation } from "../types/AccountReservation";
import type { AccountLoginFormData } from "../schemas/accountLoginSchema";
import type { accountRegisterFormData } from "../schemas/accountRegisterSchema";

type AccountResponse = {
    user: AccountUser;
};

export function registerAccount(
    data: accountRegisterFormData
) {
    return api<AccountResponse>("/account/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function loginAccount(
    data: AccountLoginFormData
) {
    return api<AccountResponse>("/account/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function logoutAccount() {
    return api<void>("/account/logout", {
        method: "POST",
    });
}

export function getCurrentAccount() {
    return api<AccountResponse>("/account/me");
}

export function getAccountReservations() {
    return api<AccountReservation[]>(
        "/account/reservations"
    );
}