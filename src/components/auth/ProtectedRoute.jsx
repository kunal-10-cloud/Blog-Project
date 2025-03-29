import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../services/authContext";

// ProtectedRoute component to restrict access to authenticated users only
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        // If still loading auth state, show nothing (or could add a loading spinner)
        if (loading) {
          return <div>Loading...</div>;
        }
        
        // If authenticated, render the component
        if (isAuthenticated) {
          return <Component {...props} />;
        }
        
        // If not authenticated, redirect to login
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute; 