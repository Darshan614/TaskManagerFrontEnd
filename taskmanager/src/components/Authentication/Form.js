import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Form.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useSelector } from "react-redux";

function Login() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setlogin] = useState(true);
  const emailref = useRef();
  const passwordref = useRef();
  const confirmpasswordref = useRef();

  useEffect(() => {
    if (isAuth) {
      navigate("/Task");
    }
  }, [isAuth, navigate]);

  const submithandler = event => {
    event.preventDefault();
    const Email = emailref.current.value;
    const Password = passwordref.current.value;
    let ConfirmPassword = login ? "" : confirmpasswordref.current.value;

    let url = "http://localhost:8080/login";
    if (!login) {
      url = "http://localhost:8080/signup";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: Email,
        password: Password,
        confirmpassword: ConfirmPassword,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        if (data.message === "User already present!") {
          setlogin(true);
        } else if (data.message === "User logged in!") {
          if (data.accessToken) {
            localStorage.setItem("user", JSON.stringify(data));
          }
          dispatch(authActions.login());
          navigate("/Task");
        } else if (data.message === "User signed up") {
          setlogin(true);
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  //toggle between login and signup state
  const toggle = login => {
    setlogin(login => !login);
  };

  return (
    <div class="container" onSubmit={submithandler}>
      <form className={classes.form}>
        <h1>{login ? "Login" : "SignUp"}</h1>
        <div className={classes.entry}>
          <label>Enter Email</label>
          <input type="email" required ref={emailref} />
        </div>
        <div className={classes.entry}>
          <label>Enter Password</label>
          <input type="password" required ref={passwordref}></input>
        </div>
        {!login && (
          <div className={classes.entry}>
            <label>Confirm Password</label>
            <input type="password" required ref={confirmpasswordref}></input>
          </div>
        )}

        <button type="submit" className={classes.submit}>
          Submit
        </button>

        <div>
          <button onClick={toggle} className={classes.signup}>
            {login ? "Create user" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
