export const getTodayDate = () => {
  const date = new Date();
  return printDate(date)
};

export const printDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  const stringDate = year + "-" + month + "-" + day + "T" + hour + ":" + minutes;
  return stringDate;
}

export const getCurrentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const currentTime = hour + ":" + minutes;
  return currentTime;
};
