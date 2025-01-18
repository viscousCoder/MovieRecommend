import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import RootFile from "./component/RootFile.tsx";
import DetailPage from "./component/DetailPage/DetailPage.tsx";
import "./App.css";
import Trending from "./component/SeeAll/Trending.tsx";
import SearchPage from "./component/SearchPage/SearchPage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootFile />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: ":id",
          element: <DetailPage />,
          loader: async ({ params }) => {
            const id = params.id;
            if (!id || isNaN(Number(id))) {
              throw new Response("Not Found", { status: 404 });
            }
            return null;
          },
          errorElement: <PageNotFound />,
        },
        {
          path: "trending",
          element: <Trending />,
        },
        {
          path: "search",
          element: <SearchPage />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
