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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiY2CWQhkgtJwIVtuULnFm1QkGaXVQ0Uc",
  authDomain: "e-learning-0501.firebaseapp.com",
  projectId: "e-learning-0501",
  storageBucket: "e-learning-0501.appspot.com",
  messagingSenderId: "941514828493",
  appId: "1:941514828493:web:5bba4e4848176804779784",
  measurementId: "G-46SWBDDNSN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
