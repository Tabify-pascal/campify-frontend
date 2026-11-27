/**
 * @file ProtectedAdminOnlyRoute.test.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ProtectedAdminOnlyRoute from "./ProtectedAdminOnlyRoute";
import { useCurrentUser } from "../queries/useCurrentUser";
import type { UserRole } from "../types/User";

jest.mock("../queries/useCurrentUser", () => ({
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

function renderRoute() {
    return render(
        <MemoryRouter initialEntries={["/admin/settings"]}>
            <Routes>
                <Route element={<ProtectedAdminOnlyRoute />}>
                    <Route
                        path="/admin/settings"
                        element={<div>Admin settings</div>}
                    />
                </Route>

                <Route
                    path="/login"
                    element={<div>Login page</div>}
                />

                <Route
                    path="/admin"
                    element={<div>Admin dashboard</div>}
                />
            </Routes>
        </MemoryRouter>,
    );
}

describe("ProtectedAdminOnlyRoute", () => {
    it("renders the loading state while loading the user", () => {
        mockUser(undefined, true);

        renderRoute();

        expect(screen.getByText(/laden/i)).toBeInTheDocument();
        expect(screen.queryByText("Admin settings"))
            .not.toBeInTheDocument();
    });

    it("redirects unauthenticated users to the login page", () => {
        mockUser();

        renderRoute();

        expect(screen.getByText("Login page"))
            .toBeInTheDocument();
        expect(screen.queryByText("Admin settings"))
            .not.toBeInTheDocument();
    });

    it("redirects customers to the admin dashboard", () => {
        mockUser("CUSTOMER");

        renderRoute();

        expect(screen.getByText("Admin dashboard"))
            .toBeInTheDocument();
        expect(screen.queryByText("Admin settings"))
            .not.toBeInTheDocument();
    });

    it("redirects managers to the admin dashboard", () => {
        mockUser("MANAGER");

        renderRoute();

        expect(screen.getByText("Admin dashboard"))
            .toBeInTheDocument();
        expect(screen.queryByText("Admin settings"))
            .not.toBeInTheDocument();
    });

    it("allows administrators to access protected content", () => {
        mockUser("ADMIN");

        renderRoute();

        expect(screen.getByText("Admin settings"))
            .toBeInTheDocument();
    });
});