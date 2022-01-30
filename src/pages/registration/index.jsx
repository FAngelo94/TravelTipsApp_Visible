import React from "react";
import { Page, Images } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions";

function Registration(props) {
  const [submitted, setSubmitted] = React.useState(false);

  const [inputs, setInputs] = React.useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const { email, username, password, repeatPassword } = inputs;
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      email &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      ) &&
      username &&
      password &&
      password === repeatPassword &&
      password.length >= 6
    ) {
      dispatch(userActions.register(inputs));
    }
  };

  useSelector((state) => {
    if (state.user.registered && submitted) {
      setInputs({
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
      });
      setSubmitted(false);
    }
  });

  return (
    <Page props={props}>
      <form
        onSubmit={handleSubmit}
        className={`w-100 h-100 needs-validation`}
        noValidate
      >
        <img
          className="bd-placeholder-img rounded mx-auto d-block mb-3"
          src={Images.logo}
          alt=""
          width="170"
          height="200"
        />
        <p className="fs-1 text-center">{window.dic("Registration")}</p>
        <div className="mx-auto w-75">
          <div className="input-group has-validation mb-3">
            <input
              type="email"
              name="email"
              className={`form-control ${
                submitted &&
                (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                  email
                )
                  ? "is-valid"
                  : "is-invalid")
              }`}
              id="email"
              placeholder="email"
              required
              autoFocus
              value={email}
              onChange={handleChange}
              maxLength={64}
            />
            <div className="invalid-tooltip">
              {window.dic("Please choose a valid email")}
            </div>
          </div>

          <div className="input-group has-validation mb-3">
            <input
              type="text"
              name="username"
              className={`form-control ${
                submitted && (username.length > 0 ? "is-valid" : "is-invalid")
              }`}
              id="username"
              placeholder="username"
              required
              autoFocus
              value={username}
              onChange={handleChange}
              maxLength={32}
            />
            <div className="invalid-tooltip">
              {window.dic("Please choose a valid username")}
            </div>
          </div>

          <div className="input-group has-validation mb-3">
            <input
              type="password"
              name="password"
              className={`form-control ${
                submitted && (password.length >= 6 ? "is-valid" : "is-invalid")
              }`}
              id="password"
              placeholder="password"
              required
              value={password}
              onChange={handleChange}
              maxLength={32}
            />
            <div className="invalid-tooltip">
              {window.dic(
                "Please choose a valid password with at least 6 characters"
              )}
            </div>
          </div>

          <div className="input-group has-validation mb-3">
            <input
              type="password"
              name="repeatPassword"
              className={`form-control ${
                submitted &&
                (repeatPassword.length >= 6 && repeatPassword === password
                  ? "is-valid"
                  : "is-invalid")
              }`}
              id="repeatPassword"
              placeholder="repeat password"
              required
              value={repeatPassword}
              onChange={handleChange}
              maxLength={32}
            />
            <div className="invalid-tooltip">
              {repeatPassword &&
                repeatPassword !== password &&
                window.dic("The two passwords do not match")}
              {!repeatPassword && window.dic("Please confirm password")}
            </div>
          </div>

          <button
            className="btn btn-lg btn-primary btn-sm w-100 mb-2"
            type="submit"
          >
            {window.dic("Confirm")}
          </button>

          <button
            className="btn btn-lg btn-link btn-sm w-100"
            onClick={() => props.history.push("/login")}
          >
            {window.dic("Login")}
          </button>
        </div>
      </form>
    </Page>
  );
}

export default Registration;
