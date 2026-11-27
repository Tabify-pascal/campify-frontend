/**
 * @file ProtectedAccountRoute.test.tsx
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

import ProtectedAccountRoute from "./ProtectedAccountRoute";
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
        <MemoryRouter initialEntries={["/account/reservations"]}>
            <Routes>
                <Route element={<ProtectedAccountRoute />}>
                    <Route
                        path="/account/reservations"
                        element={<div>Customer reservations</div>}
                    />
                </Route>

                <Route
                    path="/login"
                    element={<LoginPageStub />}
                />

                <Route
                    path="/admin"
                    element={<div>Admin dashboard</div>}
                />
            </Routes>
        </MemoryRouter>
    );
}

describe("ProtectedAccountRoute", () => {
    it("displays a loading state while fetching the user", () => {
        mockUser(undefined, true);

        renderProtectedRoute();

        expect(screen.getByText("Account laden..."))
            .toBeInTheDocument();

        expect(screen.queryByText("Customer reservations"))
            .not.toBeInTheDocument();
    });

    it("redirects unauthenticated users to login", () => {
        mockUser();

        renderProtectedRoute();

        expect(screen.getByText("Login page"))
            .toBeInTheDocument();

        expect(screen.getByText("/account/reservations"))
            .toBeInTheDocument();

        expect(screen.queryByText("Customer reservations"))
            .not.toBeInTheDocument();
    });

    it("allows customers to access their reservations", () => {
        mockUser("CUSTOMER");

        renderProtectedRoute();

        expect(screen.getByText("Customer reservations"))
            .toBeInTheDocument();
    });

    it.each<UserRole>(["ADMIN", "MANAGER"])(
        "redirects %s users to the admin dashboard",
        (role) => {
            mockUser(role);

            renderProtectedRoute();

            expect(screen.getByText("Admin dashboard"))
                .toBeInTheDocument();

            expect(screen.queryByText("Customer reservations"))
                .not.toBeInTheDocument();
        }
    );
});