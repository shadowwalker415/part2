import axios from "axios";

const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAllCountries = function () {
  const request = axios.get(url);
  return request;
};

export default getAllCountries;
