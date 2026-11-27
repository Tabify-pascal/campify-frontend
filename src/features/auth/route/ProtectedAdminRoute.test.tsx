/**
 * @file ProtectedAdminRoute.test.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-11-27
 */

import { render, screen } from "@testing-library/react";
import {
    MemoryRouter,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import ProtectedAdminRoute from "./ProtectedAdminRoute";
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

function LoginPageStub() {
    const location = useLocation();

    return (
        <div>
            Login page
            <span>{location.state?.from?.pathname}</span>
        </div>
    );
}

function renderProtectedRoute() {
    return render(
        <MemoryRouter initialEntries={["/admin"]}>
            <Routes>
                <Route element={<ProtectedAdminRoute />}>
                    <Route
                        path="/admin"
                        element={<div>Admin dashboard</div>}
                    />
                </Route>

                <Route
                    path="/login"
                    element={<LoginPageStub />}
                />

                <Route
                    path="/"
                    element={<div>Home page</div>}
                />
            </Routes>
        </MemoryRouter>
    );
}

describe("ProtectedAdminRoute", () => {
    it("displays a loading state while fetching the user", () => {
        mockUser(undefined, true);

        renderProtectedRoute();

        expect(screen.getByText("Beheeromgeving laden..."))
            .toBeInTheDocument();

        expect(screen.queryByText("Admin dashboard"))
            .not.toBeInTheDocument();
    });

    it("redirects unauthenticated users to login", () => {
        mockUser();

        renderProtectedRoute();

        expect(screen.getByText("Login page"))
            .toBeInTheDocument();

        expect(screen.getByText("/admin"))
            .toBeInTheDocument();

        expect(screen.queryByText("Admin dashboard"))
            .not.toBeInTheDocument();
    });

    it("redirects customers to the home page", () => {
        mockUser("CUSTOMER");

        renderProtectedRoute();

        expect(screen.getByText("Home page"))
            .toBeInTheDocument();

        expect(screen.queryByText("Admin dashboard"))
            .not.toBeInTheDocument();
    });

    it.each<UserRole>(["ADMIN", "MANAGER"])(
        "allows %s users to access the dashboard",
        (role) => {
            mockUser(role);

            renderProtectedRoute();

            expect(screen.getByText("Admin dashboard"))
                .toBeInTheDocument();
        }
    );
});