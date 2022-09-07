export const ErrorHandler = (err: any) => {
  if (err.code === "ERR_NETWORK") {
    return "You are offline";
  }
  if (err.code === "ERR_BAD_REQUEST") {
    if (err.response.data) {
      console.log(err.response.data.message);
      return err.response.data.message;
    } else {
      return "Something went wrong";
    }
  }
};
