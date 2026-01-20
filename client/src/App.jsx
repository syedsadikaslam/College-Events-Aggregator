import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AuthSuccess from './pages/AuthSuccess'; // <--- Ab sirf ye ek baar hai
import AllInternships from './pages/AllInternships'; 
import AllEvents from './pages/AllEvents';          
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Google Auth Success Handler */}
            <Route path="/auth-success" element={<AuthSuccess />} />
            
            {/* View All Content Routes */}
            <Route path="/all-internships" element={<AllInternships />} />
            <Route path="/all-events" element={<AllEvents />} />

            {/* Application History / Profile (Protected) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Protected Admin Route */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;