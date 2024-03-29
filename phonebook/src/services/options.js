import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getData = () => {
  const request = axios.get(baseUrl);
  return request;
};

const addContact = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request;
};

const updateContact = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact);
  return request;
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

const contactServices = {
  getData: getData,
  addContact: addContact,
  updateContact: updateContact,
  deleteConact: deleteContact,
};

export default contactServices;
