import React from "react";
import { Page, Images } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions";

function ForgottenPassword(props) {
  const [submitted, setSubmitted] = React.useState(false);
  const [email, handleEmail] = React.useState("");


  const dispatch = useDispatch();

  const sendEmail = () => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      dispatch(userActions.recoverPassword(email));
    }
    setSubmitted(true)
  }

  return (
    <Page props={props}>
      <div
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
        <p className="fs-1 text-center">{window.dic("ForgottenPassword")}</p>
        <div className="mx-auto w-75">
          <div className="input-group has-validation mb-3">
            <input
              type="email"
              name="email"
              className={`form-control ${submitted &&
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
              onChange={(e)=>handleEmail(e.target.value)}
              maxLength={64}
            />
            <div className="invalid-tooltip">
              {window.dic("Please choose a valid email")}
            </div>
          </div>

          <button
            className="btn btn-lg btn-primary btn-sm w-100 mb-2"
            onClick={sendEmail}
          >
            {window.dic("Send password reset email")}
          </button>
        </div>
      </div>
    </Page>
  );
}

export default ForgottenPassword;
