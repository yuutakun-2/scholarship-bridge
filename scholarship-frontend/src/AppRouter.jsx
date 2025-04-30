import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from "./components/AppLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import Login from "./components/pages/user/Login";
import Register from "./components/pages/user/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Tipsandtricks from "./components/pages/Tipsandtricks";
import ScholarshipDetail from "./components/pages/ScholarshipDetail";
import GeneralAi from "./components/pages/GeneralAi";

import Saved from "./components/pages/Saved";

// Admin pages
import AdminLogin from "./components/pages/admin/Login";
import Scholarships from "./components/pages/admin/Scholarships";
import CreateScholarship from "./components/pages/Admin";
import Users from "./components/pages/admin/Users";
import Search from "./components/Search";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tipsandtricks" element={<Tipsandtricks />} />
          <Route path="/aichatbot" element={<GeneralAi />} />
          <Route path="/showOne/:id" element={<ScholarshipDetail />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/search" element={<Search />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/scholarships" element={<Scholarships />} />
          <Route
            path="/admin/scholarships/create"
            element={<CreateScholarship />}
          />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
