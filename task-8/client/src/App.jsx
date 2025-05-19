import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import RootLayout from './layout/RootLayout'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "dashboard", element: <Dashboard /> }
    ]
  },
]);

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
