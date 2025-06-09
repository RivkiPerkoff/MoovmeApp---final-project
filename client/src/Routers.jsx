// import React, { useState, createContext, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


// export const Context = createContext();

// function PrivateRoute({ children }) {
//     const [currentUser] = React.useContext(Context);
//     return currentUser ? children : <Navigate to="/login" />;
// }

// export default function Routers() {
//     // const [currentUser, setCurrentUser] = useState(
//     //     JSON.parse(localStorage.getItem("currentUser")) || null
//     // );

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         const user = JSON.parse(localStorage.getItem("currentUser"));
//     //         if (user) {
//     //             try {
//     //                 const currentUser = await GET(`http://localhost:3000/users/?username=${user.username}`);
//     //                 if (currentUser.length > 0) {
//     //                     const formattedUser = {
//     //                         id: currentUser[0].id,
//     //                         name: currentUser[0].name,
//     //                         username: currentUser[0].username,
//     //                         email: currentUser[0].email,
//     //                         phone: currentUser[0].phone,
//     //                     };
//     //                     setCurrentUser(formattedUser);
//     //                 }
//     //             } catch (error) {
//     //                 console.error("Error fetching user data:", error);
//     //             }
//     //         }
//     //     };
//     //     fetchData();
//     // }, []);

//     return (
//         // <Context.Provider value={[currentUser, setCurrentUser]}>
//         //     <BrowserRouter>
//         //         <Routes>
//         //             <Route path="/login" element={<Login />} />
//         //             <Route
//         //                 path="/home"
//         //                 element={
//         //                     <PrivateRoute>
//         //                         <Home />
//         //                     </PrivateRoute>
//         //                 }
//         //             />
//         //             <Route
//         //                 path="/todos"
//         //                 element={
//         //                     <PrivateRoute>
//         //                         <Todos />
//         //                     </PrivateRoute>
//         //                 }
//         //             />
//         //             <Route
//         //                 path="/posts"
//         //                 element={
//         //                     <PrivateRoute>
//         //                         <Posts />
//         //                     </PrivateRoute>
//         //                 }
//         //             />
//         //             <Route
//         //                 path="/info"
//         //                 element={
//         //                     <PrivateRoute>
//         //                         <Info />
//         //                     </PrivateRoute>
//         //                 }
//         //             />
                   
//         //             <Route path="*" element={<Navigate to={currentUser ? "/home" : "/login"} />} />
//         //         </Routes>
//         //     </BrowserRouter>
//         // </Context.Provider>
//    <></> );
// }
