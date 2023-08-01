/** React */
import React, { useCallback } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

/** Layout */
import RootLayout from "@Layouts/RootLayout";

/** Component */
const PersonView = React.lazy(() => import("@Views/PersonView"));
const ContentItemView = React.lazy(() => import("@Views/ContentItemView"));

/** Animation */
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();

  const getRouteKey = useCallback((pathname: string) => {
    if (pathname === "/") return "root";
    if (pathname.startsWith("/search")) return "root";
    if (pathname.startsWith("/tv")) return "tv";
    if (pathname.startsWith("/movie")) return "movie";
    if (pathname.startsWith("/person")) return "person";
  }, []);

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={getRouteKey(location.pathname)}>
        <Route path="/*" element={<RootLayout />} />
        <Route
          path="/tv/:id"
          element={<ContentItemView type="tv" key="tv" />}
        />
        <Route
          path="/movie/:id"
          element={<ContentItemView type="movie" key="movie" />}
        />
        <Route path="/person/:id" element={<PersonView key="person" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
