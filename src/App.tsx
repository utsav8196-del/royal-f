import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import PublicLayout from './components/public/PublicLayout'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Courses from './pages/public/Courses'
import CourseDetail from './pages/public/CourseDetail'
import Gallery from './pages/public/Gallery'
import Contact from './pages/public/Contact'
import Admission from './pages/public/Admission'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AdminLogin from './pages/admin/Login'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminCourses from './pages/admin/Courses'
import CourseForm from './pages/admin/CourseForm'
import Enquiries from './pages/admin/Enquiries'
import AdminTestimonials from './pages/admin/Testimonials'
import AdminTeam from './pages/admin/Team'
import AdminBlog from './pages/admin/Blog'
import AdminGallery from './pages/admin/Gallery'
import AdminHomePage from './pages/admin/HomePage'
import Settings from './pages/admin/Settings'
import UserLayout from './components/user/UserLayout'
import UserDashboard from './pages/user/Dashboard'
import NotFound from './pages/NotFound'
import { AuthProvider } from './context/AuthContext'
import { SiteSettingsProvider } from './context/SiteSettingsContext'
import { ThemeProvider } from './context/ThemeContext'
import ApiOfflineBanner from './components/layout/ApiOfflineBanner'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SiteSettingsProvider>
          <ApiOfflineBanner />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admission" element={<Admission />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<AdminHomePage />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/new" element={<CourseForm />} />
          <Route path="courses/:id/edit" element={<CourseForm />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="faculty" element={<AdminTeam />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
        </SiteSettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
