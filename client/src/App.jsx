// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import Register from './pages/Register';
// // import Login from './pages/Login';
// // import Home from './pages/Home'; // ייבוא העמוד החדש

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* ברירת מחדל להפניה ללוגין */}
// //         <Route path="/" element={<Navigate to="/login" replace />} />

// //         {/* נתיבים */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/home" element={<Home />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; import { AuthProvider } from './context/AuthContext';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import RideDetails from './pages/RideDetails';



// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//           <Routes>
// //         <Route path="/" element={<Navigate to="/login" replace />} />
// //         {/* נתיבים */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/home" element={<Home />} />
//             <Route path="/rides/:id" element={<RideDetails />} />
//           </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RideForm from './pages/RideForm';
import RideDetails from './pages/RideDetails';
import RideRequests from './pages/RideRequests';
import MyRequests from './pages/MyRequests';
import AdminDashboard from './pages/AdminDashboard';
import MyJoinedRides from './pages/MyJoinedRides';


import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ride/new" element={<RideForm />} />
          <Route path="/rides/:id" element={<RideDetails />} />
          <Route path="/ride/:id/requests" element={<RideRequests />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/my-joined-rides" element={<MyJoinedRides />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

