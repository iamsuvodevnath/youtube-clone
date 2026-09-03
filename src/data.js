export const API_KEY = "AIzaSyB7yQY7Itg6Plu0FGhH9RM33kaGzyc0ABU";

export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1606008) + "M";
  } else if (value >= 1006) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};
