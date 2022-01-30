import React from "react";

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Custom hooks to manage the status of generic fields and set their initial values
 * @param {*} fields
 * @param {*} currentValues
 */
export const useStatusFields = (fields, currentValues = null) => {
  const v = {};
  fields.forEach((field) => {
    v[field.name] = field.value || "";
  });
  if (currentValues)
    for (const [key, value] of Object.entries(currentValues)) {
      v[key] = value;
    }

  const [inputs, setInputs] = React.useState(v);

  const handle = (e) => {
    const { name, value } = e.target;
    if (name === "multiplefiles" || name === "file") {
      const files = e.target.files;
      let imagesArray = [];
      for (let i = 0; i < files.length; i++) {
        getBase64(files[i]).then((data) => {
          imagesArray.push(data);
        });
      }
      setInputs((inputs) => ({ ...inputs, ['images']: imagesArray }));
      setInputs((inputs) => ({ ...inputs, [name]: value }));
    } else {
      setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

  };

  return [inputs, handle];
};

const MAX_BOOKED_PLACES = 4;

export const useBookDate = (calendar) => {
  const [indexDate, handleIndexDate] = React.useState(-1);
  const [errorPlaces, handleErrorPlaces] = React.useState(false);
  const [bookedPlaces, handleBookedPlaces] = React.useState(0);

  const handleBookedPlaces2 = (e) => {
    handleBookedPlaces(e.target.value)
    const newValue = e.target.value;
    if (indexDate !== -1 && newValue > 0 && newValue <= (calendar[indexDate].availablePlaces - calendar[indexDate].booked) && newValue <= MAX_BOOKED_PLACES)
      handleErrorPlaces(false)
    else
      handleErrorPlaces(true);
  }

  return [bookedPlaces, handleBookedPlaces2, errorPlaces, indexDate, handleIndexDate]
}

export const useDeleteDateWithModal = (removeDateFunction, id = null) => {
  const [deleteModalOpen, handleDeleteModalStatus] = React.useState(false);
  const [dateToBeDeleted, handleDateToBeDeleted] = React.useState(null);
  const [idToBeDeleted, handleIdToBeDeleted] = React.useState(id);

  const openModal = (date, id = null) => {
    handleDateToBeDeleted(date);
    handleDeleteModalStatus(true);
    if (id != null)
      handleIdToBeDeleted(id);
  }

  const closeModal = () => handleDeleteModalStatus(false);

  const deleteDate = () => {
    removeDateFunction({
      id: idToBeDeleted,
      date: dateToBeDeleted
    })
    closeModal();
  }

  return [deleteModalOpen, openModal, closeModal, deleteDate];
}