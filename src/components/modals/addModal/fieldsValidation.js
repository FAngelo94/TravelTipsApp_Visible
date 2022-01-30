//TODO check this values
// const MAX_TAG_LENGTH = 16;
// const MAX_LANGUAGE_LENGTH = 32;

/**
 * In this function we evaluate if the value inserted by the user is valid depending on the
 * name we are considering (example: for tag I will check the lenght of any single tag,
 * fot )
 * @param {*} nameField name of field we want to check validation
 * @param {*} value current value we want check
 */
export const fieldIsInvalid = (nameField, value) => {
  if (!value) return true;
  if (nameField === "tags") {
    if (!/^((([0-9A-Za-zÀ-ʯ]{1,16}),)*)+$/.test(value + ",")) return true;
  }
  if (nameField === "languages") {
    if (!/^((([A-Za-zÀ-ʯ]{1,32}),)*)+$/.test(value + ",")) return true;
  }
  return false;
};
