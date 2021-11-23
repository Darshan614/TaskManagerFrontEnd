import { Fragment } from "react";
import classes from "./Header.module.css";
import { useSelector , useDispatch } from "react-redux";
import { taskActions } from "../../store/task";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const changemodalstate = () => {
    dispatch(taskActions.changetoaddmode());
  };

  const onlogout = () => {
    localStorage.removeItem("user");
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <Fragment>
      <div className={classes.navbuttons}>
        <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
          <div class="container-fluid">
            <span class="navbar-brand" href="#">
              TaskManager
            </span>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item" className={classes.navbardisplay}>
                  {isAuth && (
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={onlogout}
                    >
                      Logout
                    </button>
                  )}
                  {!isAuth && (
                    <a href="/Login">
                      <button type="button" class="btn btn-success">
                        Login
                      </button>
                    </a>
                  )}
                </li>
                <li>
                  {isAuth && (
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={changemodalstate}
                    >
                      ADD TASK
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}

export default Header;
