import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { House, List, ShoppingCart,LogOut,LogIn} from "lucide-react";

const Sidebar = ({ setOpenSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const routeArray = [
    {
      name: "Home",
      path: "/",
      icon: <House size={20} strokeWidth={2.5} />,
    },
    {
      name: "View All",
      path: "/view-all",
      icon: <List size={20} strokeWidth={2.5} />,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <ShoppingCart size={20} strokeWidth={2.5} />,
    },
        {
      name: userDetails ? "logout" : "Login",
      path: userDetails ? "/logout" : "/auth",
      icon: userDetails ? <LogOut className="w-5 h-5 mr-2" /> :
          <LogIn size={20} strokeWidth={2.5} />,
    },
  ];

  return (
    <div
      className="invincible"
      onClick={() => setOpenSidebar(false)} // 👈 close when clicking outside
    >
      <div
        className="sidebar"
        onClick={(e) => e.stopPropagation()} // 👈 prevent closing when inside
      >
        <h2 className="logo">FeetFitness</h2>

        <div className="routes">
          {routeArray.map((route, index) => {
            const isActive = location.pathname === route.path;

            return (
              <div
                key={index}
                className={`route ${isActive ? "active" : ""}`}
                onClick={() => {
                if(route.path == "/logout"){
                  localStorage.removeItem("token")
                  localStorage.removeItem("userDetails")
                }else{
                  navigate(route.path);
                }
                  setOpenSidebar(false); // 👈 also close after navigation
                }}
              >
                <span className="icon">{route.icon}</span>
                <p>{route.name}</p>
              </div>
            );
          })}
          { userDetails &&(
          <div class="container">
  <div class="card">
    <div class="card-header">
      <div class="avatar"></div>
      <div class="user-info">
        <p class="role">{userDetails.name}</p>
        <p class="email">{userDetails.email}</p>
      </div>
    </div>
  </div>
</div>
)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;