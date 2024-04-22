// App.tsx
import "./App.css";
import AuthProvider from "./AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Products from "./components/Products";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<Products />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;