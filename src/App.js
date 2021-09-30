import { Route, Switch, BrowserRouter } from "react-router-dom";
import Logout from "./auth/Logout";
import ScrollToTop from "./components/ScrollToTop";
import CourseDetails from "./pages/CourseDetails";
import CourseManagement from "./pages/CourseManagement";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyCourses from "./pages/MyCourses";
import SignUp from "./pages/SignUp";
import UserManagement from "./pages/UserManagement";
import HomeTemplate from "./templates/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate";

function App() {
  const user = JSON.parse(localStorage.getItem("account"));
  const isAdmin = user && user.maLoaiNguoiDung === "GV";
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <HomeTemplate exact path="/detail/:id" Component={CourseDetails} />
        <HomeTemplate exact path="/courses" Component={Courses} />
        <HomeTemplate exact path="/my-courses" Component={MyCourses} />
        <HomeTemplate exact path="/logout" Component={Logout} />

        <AdminTemplate
          exact
          path="/course-management"
          Component={CourseManagement}
          isAdmin={isAdmin}
        />
        <AdminTemplate
          exact
          path="/user-management"
          Component={UserManagement}
          isAdmin={isAdmin}
        />

        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
