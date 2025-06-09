import React, { createContext, useState, useEffect } from 'react';

// יצירת ה-Context
export const AuthContext = createContext();

// ספק ה-Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // לדוגמה: נטעין את המשתמש מ-localStorage בתחילת הריצה
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // פונקציה לשמירת המשתמש גם ב-state וגם ב-localStorage
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // פונקציה ליציאה (Logout)
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
