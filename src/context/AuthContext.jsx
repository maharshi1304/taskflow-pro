import { createContext, useContext, useState,} from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("taskflow-user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  function login(email, password) {
    if (
      email === "admin@taskflow.com" &&
      password === "123456"
    ) {
      const loggedInUser = {
        name: "Admin User",
        email,
      };

      localStorage.setItem("taskflow-user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  function logout() {
    localStorage.removeItem("taskflow-user");
    setUser(null);
  }

  const value = { user, login, logout, isAuthenticated: Boolean(user),};
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export {
  AuthProvider,
  useAuth,
};