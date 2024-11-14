import "./App.css";

// import MainLayout from "./layouts/MainLayout";
// import AboutPage from "./pages/AboutPage";
// import BlogDetailPage from "./pages/BlogDetailPage";
// import BlogPage from "./pages/BlogPage";
// import ChangePasswordPage from "./pages/ChangePasswordPage";
// import ContactPage from "./pages/ContactPage";
// import CourseDetailPage from "./pages/CourseDetailPage";
// import CourseOrderPage from "./pages/CourseOrderPage";
// import CoursePage from "./pages/CoursePage";
// import HomePage from "./pages/HomePage";
// import NotFoundPage from "./pages/NotFoundPage";
// import PaymentMethodPage from "./pages/PaymentMethodPage";
// import PrivacyPage from "./pages/PrivacyPage";
// import ProfilePage from "./pages/ProfilePage";
// import MyInfo from "./pages/ProfilePage/MyInfo";
// import MyCourse from "./pages/ProfilePage/MyCourse";
// import MyPayment from "./pages/ProfilePage/MyPayment";
// import PrivateRoute from "./components/PrivateRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PATHS from "./constants/paths";
import { lazy, Suspense } from "react";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const CourseOrderPage = lazy(() => import("./pages/CourseOrderPage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PaymentMethodPage = lazy(() => import("./pages/PaymentMethodPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const MyInfo = lazy(() => import("./pages/ProfilePage/MyInfo"));
const MyCourse = lazy(() => import("./pages/ProfilePage/MyCourse"));
const MyPayment = lazy(() => import("./pages/ProfilePage/MyPayment"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route
              path={PATHS.CHANGE_PASSWORD}
              element={<ChangePasswordPage />}
            />

            <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
            <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />

            <Route path={PATHS.COURSE.INDEX} element={<CoursePage />} />
            <Route path={PATHS.COURSE.DETAIL} element={<CourseDetailPage />} />

            <Route
              path={PATHS.PAYMENT_METHOD}
              element={<PaymentMethodPage />}
            />
            <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />

            <Route element={<PrivateRoute />} redirectPath={PATHS.BLOG}>
              <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
              <Route path={PATHS.PROFILE.INDEX} element={<ProfilePage />}>
                <Route index element={<MyInfo />} />
                <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
                <Route
                  path={PATHS.PROFILE.MY_PAYMENT}
                  element={<MyPayment />}
                />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
