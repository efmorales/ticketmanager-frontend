import { Outlet } from "react-router-dom";
import "./OrganizationLayout.css"

const OrganizationLayout = () => {
  return (
    <div className="organization-page">
      <nav className="organization-nav">
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
          <li>Link 5</li>
        </ul>
      </nav>
      <section className="organization-content">
        <Outlet />
      </section>
    </div>
  );
};

export default OrganizationLayout;
