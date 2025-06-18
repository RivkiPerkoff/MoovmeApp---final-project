// // // src/App.jsx
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // import Layout from './components/Layout';
// // import Home from './pages/Home';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import RideForm from './pages/RideForm';
// // import RideDetails from './pages/RideDetails';
// // import RideRequests from './pages/RideRequests';
// // import MyRequests from './pages/MyRequests';
// // import AdminDashboard from './pages/AdminDashboard';
// // import MyJoinedRides from './pages/MyJoinedRides';


// // import './App.css';

// // function App() {
// //   return (
// //     <Router>
// //       <Layout>
// //         <Routes>
// //           <Route path="/" element={<Login />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/home" element={<Home />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/ride/new" element={<RideForm />} />
// //           <Route path="/rides/:id" element={<RideDetails />} />
// //           <Route path="/ride/:id/requests" element={<RideRequests />} />
// //           <Route path="/my-requests" element={<MyRequests />} />
// // <Route
// //   path="/admin"
// //   element={
// //     user?.user_type === 'admin' ? (
// //       <AdminDashboard />
// //     ) : (
// //       <Navigate to="/home" />
// //     )
// //   }
// // />
// //           <Route path="/my-joined-rides" element={<MyJoinedRides />} />

// //         </Routes>
// //       </Layout>
// //     </Router>
// //   );
// // }

// // export default App;


// // src/App.jsx
// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Layout from './components/Layout';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import RideForm from './pages/RideForm';
// import RideDetails from './pages/RideDetails';
// import RideRequests from './pages/RideRequests';
// import MyRequests from './pages/MyRequests';
// import AdminDashboard from './pages/AdminDashboard';
// import MyJoinedRides from './pages/MyJoinedRides';
// import { AuthContext } from './context/AuthContext';

// import './App.css';

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/ride/new" element={<RideForm />} />
//           <Route path="/rides/:id" element={<RideDetails />} />
//           <Route path="/ride/:id/requests" element={<RideRequests />} />
//           <Route path="/my-requests" element={<MyRequests />} />
//           {user?.user_type === 'admin' && (
//             <Route path="/admin" element={<AdminDashboard />} />
//           )}
//           <Route path="/my-joined-rides" element={<MyJoinedRides />} />
//     <Route
//   path="/admin"
//   element={
//     user ? (
//       user.user_type === 'admin' ? (
//         <AdminDashboard />
//       ) : (
//         <Navigate to="/home" />
//       )
//     ) : (
//       <Navigate to="/login" />
//     )
//   }
// />

//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import { AuthContext } from './context/AuthContext';

import './App.css';

function App() {
  const { user } = useContext(AuthContext);

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
          <Route path="/my-joined-rides" element={<MyJoinedRides />} />

          <Route
            path="/admin"
            element={
              user ? (
                user.user_type === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/home" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
