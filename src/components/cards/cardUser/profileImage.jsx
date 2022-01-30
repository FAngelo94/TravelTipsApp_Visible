import React from "react";
import { Icons } from "../../";
import { CustomHooks } from "../../../utils";

function ProfileImage({ dispatchUpdateProfileImage, user, editable }) {
  // Functions to update profile image
  const [profileImage, handleProfileImage] = React.useState("");
  const [errorImage, handleErrorImage] = React.useState(false);
  const [isOpenModifyImage, handleIsOpenModifyImage] = React.useState(false);

  const updateProfileImage = (e) => {
    e.preventDefault();
    if (!profileImage || /^[image/(jpg|jpeg|png)]/.test(profileImage.type)) {
      handleIsOpenModifyImage(false);
      if (profileImage!="") {
        CustomHooks.getBase64(profileImage).then((image) => {
          const data = { image };
          dispatchUpdateProfileImage(data);
          handleProfileImage("");
        })
      } else {
        const data = { };
        dispatchUpdateProfileImage({})
        handleProfileImage("");
      }
    } else handleErrorImage(true);
  };

  return (
    <div>
      {!isOpenModifyImage ? (
        <div className="position-relative">
          <img
            src={user.image ? window.images_url + user.image : `https://robohash.org/${user.username}?set=set4`}
            className="card-img-top"
            alt=""
          />
          {editable && (
            <button
              className="btn btn-light rounded-circle p-2 position-absolute bottom-0 end-0 me-2 mb-2"
              onClick={() => handleIsOpenModifyImage(true)}
            >
              <Icons.Camera d={1.5} />
            </button>
          )}
        </div>
      ) : (
        editable &&
        isOpenModifyImage && (
          <form className="mb-2 d-flex align-items-end justify-content-center needs-validation">
            <div className="position-relative me-2 has-validation">
              <label htmlFor="formFile" className="form-label">
                {window.dic("Select a profile image")}
              </label>
              <input
                className={`form-control form-control-sm ${errorImage && "is-invalid"
                  }`}
                accept=".jpg,.jpeg,.png"
                type="file"
                onChange={(e) => {
                  if (e.target.files.length > 0)
                    if (/^[image/(jpg|jpeg|png)]/.test(e.target.files[0].type))
                      handleErrorImage(false);
                    else handleErrorImage(true);
                  handleProfileImage(e.target.files[0]);
                }}
              />
              <div className="invalid-tooltip">
                {window.dic(
                  "Leave it empty or choose a valid image format: png, jpeg, jpg"
                )}
              </div>
            </div>
            <button
              className="btn btn-primary btn-sm h-25"
              onClick={(e) => updateProfileImage(e)}
            >
              {window.dic("Confirm")}
            </button>
          </form>
        )
      )}
    </div>
  );
}

export default ProfileImage;
