import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import LandingPage from "./pages/LandingPage.jsx";
import { ExperiencePage } from "./pages/Experience.jsx";
import { PublicationPage } from "./pages/PublicationPage.jsx";
import { ScholarshipAndAwardsPage } from "./pages/ScholarshipAward.jsx";
import ResearchPage from "./pages/ResearchPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import TeachingAndSupervisionPage from "./pages/Teaching.jsx";

// Admin components
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import PersonalInfoAdmin from "./pages/admin/PersonalInfoAdmin.jsx";
import EducationAdmin from "./pages/admin/EducationAdmin.jsx";
import ExperienceAdmin from "./pages/admin/ExperienceAdmin.jsx";
import PublicationsAdmin from "./pages/admin/PublicationsAdmin.jsx";
import ResearchAdmin from "./pages/admin/ResearchAdmin.jsx";
import NewsAdmin from "./pages/admin/NewsAdmin.jsx";
import AwardsAdmin from "./pages/admin/AwardsAdmin.jsx";
import TeachingAdmin from "./pages/admin/TeachingAdmin.jsx";

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'experience', element: <ExperiencePage /> },
      { path: 'publications', element: <PublicationPage /> },
      { path: 'scholarship_awards', element: <ScholarshipAndAwardsPage /> },
      { path: 'research', element: <ResearchPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'teaching_supervision', element: <TeachingAndSupervisionPage /> },
      
      // 404 Not Found route
      { path: "*", element: <NotFound /> },
    ],
  },
  
  // Admin routes
  {
    path: 'admin/login',
    element: <AdminLogin />,
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'personal', element: <PersonalInfoAdmin /> },
      { path: 'education', element: <EducationAdmin /> },
      { path: 'experience', element: <ExperienceAdmin /> },
      { path: 'publications', element: <PublicationsAdmin /> },
      { path: 'research', element: <ResearchAdmin /> },
      { path: 'news', element: <NewsAdmin /> },
      { path: 'awards', element: <AwardsAdmin /> },
      { path: 'teaching', element: <TeachingAdmin /> },
      { path: 'settings', element: <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Coming soon...</p></div> },
    ],
  }
])


export default router