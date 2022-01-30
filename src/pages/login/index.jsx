import React from "react";
import { Page, Images } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions";

function Login(props) {
  const [submitted, setSubmitted] = React.useState(false);

  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  };

  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  React.useEffect(() => {
    if (loggedIn) props.history.push("/");
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.getItem("user")) props.history.push("/");
  }, []);

  return (
    <Page props={props}>
      <form
        onSubmit={handleSubmit}
        className={`w-100 h-100 pt-5 needs-validation ${
          submitted && "was-validated"
        }`}
        noValidate
      >
        <img
          className="bd-placeholder-img rounded mx-auto d-block mb-3"
          src={Images.logo}
          alt=""
          width="170"
          height="200"
        />
        <div className="mx-auto w-75 d-flex flex-column">
          <div className="input-group has-validation mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="email"
              required
              autoFocus
              value={email}
              onChange={handleChange}
            />
            <div className="invalid-tooltip">
              {window.dic("Please choose a valid email")}
            </div>
          </div>

          <div className="input-group has-validation mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="password"
              required
              value={password}
              onChange={handleChange}
            />
            <div className="invalid-tooltip">
              {window.dic("Please choose a valid password")}
            </div>
          </div>

          <button
            className="btn btn-lg btn-primary btn-sm w-100 mb-2"
            type="submit"
          >
            {window.dic("Login")}
          </button>

          <div
            className={`spinner-border mx-auto ${!loggingIn && "d-none"}`}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>

          <button
            className="btn btn-lg btn-link btn-sm w-100"
            onClick={() => props.history.push("/forgottenPassword")}
          >
            {window.dic("Forgot password")}
          </button>

          <button
            className="btn btn-lg btn-link btn-sm w-100"
            onClick={() => props.history.push("/registration")}
          >
            {window.dic("Create a new user")}
          </button>
        </div>
      </form>
    </Page>
  );
}

export default Login;
