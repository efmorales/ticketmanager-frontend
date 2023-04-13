import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <h1>This is my App Layout!</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
