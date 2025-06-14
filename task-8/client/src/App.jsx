import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import RootLayout from './layout/RootLayout'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import OauthSuccess from './pages/OauthSuccess'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "oauth-success", element: <OauthSuccess /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "register", element: <Register /> }
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
