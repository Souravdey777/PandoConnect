export default function validateCreateLink(values) {
  let errors = {};

  //Description Errors
  if (!values.url) {
    errors.url = "A title is required.";
  } else if (values.url.length < 10) {
    errors.url = "The title must be at least 10 characters.";
  }

  // //URL Errors
  // if (!values.url) {
  //   errors.url = "A URL is required.";
  // } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
  //   errors.url = "The URL must be valid.";
  // }

  return errors;
}
