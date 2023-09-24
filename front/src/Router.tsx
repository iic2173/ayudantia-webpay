import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConfirmPurchase from "./pages/ConfirmPurchase";
import PurchaseCompleted from "./pages/PurchaseCompleted";

const queryClient = new QueryClient()

function Router() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }, 
    {
      path: "/confirm-purchase",
      element: <ConfirmPurchase />
    },
    {
      path: '/completed-purchase',
      element: <PurchaseCompleted />

    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}

export default Router;