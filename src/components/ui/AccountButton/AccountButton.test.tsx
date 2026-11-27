/**
 * @file AccountButton.test.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AccountButton from "./AccountButton";
import { useCurrentUser } from "../../../features/auth/queries/useCurrentUser";
import type { UserRole } from "../../../features/auth/types/User";

jest.mock("../../../features/auth/queries/useCurrentUser", () => ({
    useCurrentUser: jest.fn(),
}));

const mockUseCurrentUser = jest.mocked(useCurrentUser);

function mockUser(role?: UserRole, isLoading = false) {
    mockUseCurrentUser.mockReturnValue({
        isLoading,
        data: role
            ? {
                user: {
                    id: "user-1",
                    firstName: "John",
                    lastName: "Doe",
                    email: "john@example.com",
                    role,
                },
            }
            : undefined,
    } as ReturnType<typeof useCurrentUser>);
}

function renderAccountButton() {
    return render(
        <MemoryRouter>
            <AccountButton />
        </MemoryRouter>
    );
}

describe("AccountButton", () => {
    it("does not display a link while loading", () => {
        mockUser(undefined, true);

        renderAccountButton();

        expect(screen.queryByRole("link"))
            .not.toBeInTheDocument();
    });

    it("displays a login link for unauthenticated users", () => {
        mockUser();

        renderAccountButton();

        expect(screen.getByRole("link", { name: "Inloggen" }))
            .toHaveAttribute("href", "/login");
    });

    it("displays an account link for customers", () => {
        mockUser("CUSTOMER");

        renderAccountButton();

        expect(screen.getByRole("link", { name: "Mijn account" }))
            .toHaveAttribute("href", "/account/reservations");

        expect(screen.queryByRole("link", { name: "Inloggen" }))
            .not.toBeInTheDocument();
    });

    it.each<UserRole>(["ADMIN", "MANAGER"])(
        "displays a dashboard link for %s users",
        (role) => {
            mockUser(role);

            renderAccountButton();

            expect(screen.getByRole("link", { name: "Dashboard" }))
                .toHaveAttribute("href", "/admin");

            expect(screen.queryByRole("link", { name: "Inloggen" }))
                .not.toBeInTheDocument();
        }
    );
});