import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../../components/layout/Layout";
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

import AdminLoginPage from "../../features/auth/pages/loginPage";

// // // // ADMIN // // // // //
import ProtectedAdminRoute from "../../features/auth/route/ProtectedAdminRoute";
import AdminLayout from "../../features/auth/components/AdminLayout";
import AdminDashboardPage from "../../features/admin/dashboard/pages/Dashboard";

// Spots
import AdminSpotsPage from "../../features/admin/spots/pages/AdminSpotsPage";
import AdminSpotCreatePage from "../../features/admin/spots/pages/AdminSpotCreatePage";
import AdminSpotEditPage from "../../features/admin/spots/pages/AdminSpotEditPage";

// News
import AdminNewsPage from "../../features/admin/news/pages/AdminNewsPage";
import AdminNewsCreatePage from "../../features/admin/news/pages/AdminNewsCreatePage";
import AdminNewsEditPage from "../../features/admin/news/pages/AdminNewsEditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/plaatsen",
        element: <SpotsPage />
      },
      {
        path: "/plaatsen/:spotId",
        element: <SpotDetailPage />
      },
      {
        path: "/reserveren",
        element: <ReservationPage />,
      },
      {
        path: "/bevestiging",
        element: <ConfirmationPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/nieuws",
        element: <NewsPage />,
      },
      {
        path: "/nieuws/:newsId",
        element: <NewsDetailPage />,
      },
      {
        path: "/admin/login",
        element: <AdminLoginPage />,
      },
      {
        element: <ProtectedAdminRoute />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              
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
                index: true,
                element: <AdminDashboardPage/>
              },
            ]
          }
        ]
      }
    ]
  },


]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
