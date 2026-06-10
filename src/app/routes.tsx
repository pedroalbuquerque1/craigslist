import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import ChatPage from "./pages/ChatPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/search", Component: SearchPage },
  { path: "/item/:id", Component: ItemDetailsPage },
  { path: "/chat/:id", Component: ChatPage },
  { path: "/messages", Component: MessagesPage },
  { path: "/profile", Component: ProfilePage },
  { path: "/post", Component: PostPage },
]);
