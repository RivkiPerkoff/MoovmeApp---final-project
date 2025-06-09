// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Home from './pages/Home'; // ייבוא העמוד החדש

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ברירת מחדל להפניה ללוגין */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* נתיבים */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import RideDetails from './pages/RideDetails';



function App() {
  return (
    <AuthProvider>
      <Router>
          <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         {/* נתיבים */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/home" element={<Home />} />
            <Route path="/rides/:id" element={<RideDetails />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
