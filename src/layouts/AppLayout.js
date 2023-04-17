import { Outlet } from "react-router-dom";

import "./AppLayout.css";

const AppLayout = () => {
  return (
    <>
      <header className="app-header">
        <h1 className="header-title">
          
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
