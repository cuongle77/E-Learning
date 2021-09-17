import { Route, Switch, BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomeTemplate from "./templates/HomeTemplate";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <HomeTemplate exact path="/detail/:id" Component={CourseDetails} />
        <HomeTemplate exact path="/courses" Component={Courses} />

        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
