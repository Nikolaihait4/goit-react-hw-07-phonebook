import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://65393d77e3b530c8d9e828ef.mockapi.io/api/v1',
});

export const requestContacts = async () => {
  const { data } = await contactsInstance.get('/contacts');
  return data;
};

export const requestAddContacts = async newContact => {
  const { data } = await contactsInstance.post('/contacts', newContact);
  return data;
};

export const requestDeleteContacts = async contactId => {
  const { data } = await contactsInstance.delete(`/contacts/${contactId}`);
  return data;
};
