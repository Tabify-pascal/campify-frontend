import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";
import AdminLayout from "../../components/layout/AdminLayout";
import AccountLayout from "../../components/layout/AccountLayout";

import HomePage from "../../features/root/pages/HomePage";
import NotFoundPage from "../../features/root/pages/NotFoundPage";

import SpotsPage from "../../features/spots/pages/SpotsPage";
import SpotDetailPage from "../../features/spots/pages/SpotDetailPage";

import ReservationPage from "../../features/reservations/pages/ReservationPage";
import ConfirmationPage from "../../features/confirmations/pages/ConfirmationPage";

import ContactPage from "../../features/contact/pages/ContactPage";
import FaqPage from "../../features/faq/pages/FaqPage";

import NewsPage from "../../features/news/pages/NewsPage";
import NewsDetailPage from "../../features/news/pages/NewsDetailPage";

// Auth
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import ProtectedAccountRoute from "../../features/auth/route/ProtectedAccountRoute";
import ProtectedAdminRoute from "../../features/auth/route/ProtectedAdminRoute";

// Account
import AccountReservationsPage from "../../features/account/pages/AccountReservationsPage";

// Admin dashboard
import AdminDashboardPage from "../../features/admin/dashboard/pages/Dashboard";

// Admin spots
import AdminSpotsPage from "../../features/admin/spots/pages/AdminSpotsPage";
import AdminSpotCreatePage from "../../features/admin/spots/pages/AdminSpotCreatePage";
import AdminSpotEditPage from "../../features/admin/spots/pages/AdminSpotEditPage";

// Admin news
import AdminNewsPage from "../../features/admin/news/pages/AdminNewsPage";
import AdminNewsCreatePage from "../../features/admin/news/pages/AdminNewsCreatePage";
import AdminNewsEditPage from "../../features/admin/news/pages/AdminNewsEditPage";

// Admin reservations
import AdminReservationsPage from "../../features/admin/reservations/pages/AdminReservationsPage";
import AdminReservationDetailPage from "../../features/admin/reservations/pages/AdminReservationDetailPage";

// Admin FAQs
import AdminFaqPage from "../../features/admin/faqs/pages/AdminFaqPage";
import AdminFaqEditPage from "../../features/admin/faqs/pages/AdminFaqEditPage";
import AdminFaqCreatePage from "../../features/admin/faqs/pages/AdminCreateFaq";

// Admin messages
import AdminMessagePage from "../../features/admin/messages/pages/adminMessagePage";
import AdminMessageDetailPage from "../../features/admin/messages/pages/adminMessageDetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },

            // Public
            {
                path: "plaatsen",
                element: <SpotsPage />,
            },
            {
                path: "plaatsen/:spotId",
                element: <SpotDetailPage />,
            },
            {
                path: "reserveren",
                element: <ReservationPage />,
            },
            {
                path: "bevestiging",
                element: <ConfirmationPage />,
            },
            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: "faq",
                element: <FaqPage />,
            },
            {
                path: "nieuws",
                element: <NewsPage />,
            },
            {
                path: "nieuws/:newsId",
                element: <NewsDetailPage />,
            },

            // Unified auth
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },

            // Customer account
            {
                element: <ProtectedAccountRoute />,
                children: [
                    {
                        path: "account",
                        element: <AccountLayout />,
                        children: [
                            {
                                index: true,
                                element: (
                                    <Navigate
                                        to="reservations"
                                        replace
                                    />
                                ),
                            },
                            {
                                path: "reservations",
                                element: <AccountReservationsPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // Admin
    {
        element: <ProtectedAdminRoute />,
        children: [
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <AdminDashboardPage />,
                    },
                    {
                        path: "spots",
                        element: <AdminSpotsPage />,
                    },
                    {
                        path: "spots/new",
                        element: <AdminSpotCreatePage />,
                    },
                    {
                        path: "spots/:spotId/edit",
                        element: <AdminSpotEditPage />,
                    },
                    {
                        path: "news",
                        element: <AdminNewsPage />,
                    },
                    {
                        path: "news/new",
                        element: <AdminNewsCreatePage />,
                    },
                    {
                        path: "news/:newsId/edit",
                        element: <AdminNewsEditPage />,
                    },
                    {
                        path: "reservations",
                        element: <AdminReservationsPage />,
                    },
                    {
                        path: "reservations/:reservationId",
                        element: <AdminReservationDetailPage />,
                    },
                    {
                        path: "faqs",
                        element: <AdminFaqPage />,
                    },
                    {
                        path: "faqs/:faqId/edit",
                        element: <AdminFaqEditPage />,
                    },
                    {
                        path: "faqs/new",
                        element: <AdminFaqCreatePage />,
                    },
                    {
                        path: "messages",
                        element: <AdminMessagePage />,
                    },
                    {
                        path: "messages/:messageId",
                        element: <AdminMessageDetailPage />,
                    },
                ],
            },
        ],
    },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
