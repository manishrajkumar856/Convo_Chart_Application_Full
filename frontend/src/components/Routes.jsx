import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignupPage from "../pages/AuthenticationPages/SignupPage";
import LoginPage from "../pages/AuthenticationPages/LoginPage";
import HomePage from "../pages/HomePage.jsx/HomePage";
import VerifyForm from "../pages/AuthenticationPages/VerifyForm";
import SignupForm from "../pages/AuthenticationPages/SignupForm";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import FriendPage from "../pages/ChartPage/FriendPage";
import ChatPage from "../pages/ChartPage/ChatPage";
import ShowFriendList from "../pages/ChartPage/ShowFriendList";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import PostPage from "../pages/PostPage/PostPage";
import PeoplePage from "../pages/FriendListPage/PeoplePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/signup",
        element: <SignupPage />,
        children: [
          { index: true, element: <SignupForm /> }, // ✅ /signup
          { path: "verify", element: <VerifyForm /> },
        ],
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/notification", element: <NotificationPage /> },
      { path: "/friends", element: <FriendPage />, 
        children: [
          { index: true, element: <ShowFriendList/> }, // ✅ /signup
          { path: 'chat/:id', element: <ChatPage />}
        ]
      },
      { path: '/profile/*', element: <ProfilePage /> },
      { path: '/details/:id/*', element: <DetailsPage /> },
      { path: '/people', element: <PeoplePage />},
      { path: '/posts', element: <PostPage />}
    ],
  },
]);
