import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletContact } from 'redux/contactReduser';
import css from './ContactList.module.css';

import {
  selectContact,
  selectContactError,
  selectContactFilter,
  selectContactIsLoading,
} from 'redux/contactsSelector';

import ErrorMessage from 'components/helper/ErrorMessage';
import Loader from 'components/helper/Loader';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);
  const filterTerm = useSelector(selectContactFilter);
  const isLoading = useSelector(selectContactIsLoading);
  const error = useSelector(selectContactError);

  const handleDeleteContact = contactId => {
    dispatch(deletContact(contactId));
    toast.success('Contact deleted successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const filteredContacts =
    contacts !== null &&
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterTerm.toLowerCase().trim())
    );

  return (
    <div className={css.listContainer}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ul className={css.listUl}>
        {filteredContacts &&
          filteredContacts.map(({ id, name, phone }) => {
            return (
              <li key={id} className={css.listLi}>
                <h3 className={css.listTitle}>Name: {name}</h3>
                <p className={css.listPhone}>Phone: {phone}</p>
                <button
                  className={css.listDelete}
                  onClick={() => handleDeleteContact(id)}
                >
                  <FaTrashAlt />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ContactList;
