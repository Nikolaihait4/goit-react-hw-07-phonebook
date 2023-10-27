import ErrorMessage from 'components/helper/ErrorMessage';
import Loader from 'components/helper/Loader';
import React, { useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deletContact,
  fetchContacts,
  setFilterTerm,
} from 'redux/contactReduser';
import {
  selectContact,
  selectContactError,
  selectContactFilter,
  selectContactIsLoading,
} from 'redux/contactsSelector';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);
  const isLoading = useSelector(selectContactIsLoading);
  const error = useSelector(selectContactError);
  const filterTerm = useSelector(selectContactFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const phone = e.currentTarget.elements.phone.value;

    const newContact = {
      name,
      phone,
    };

    dispatch(addContact(newContact));
    e.currentTarget.reset();
    // console.log(newContact);
  };

  const handleDeleteContact = contacttId => {
    dispatch(deletContact(contacttId));
  };

  const handleFilterTerm = ({ target: { value } }) => {
    dispatch(setFilterTerm(value));
  };

  const filteredContacts =
    contacts !== null &&
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterTerm.toLowerCase().trim())
    );

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleAddContact}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            pattern="\+?[0-9\s\-\(\)]+"
            title="Phone number must contain only digits, spaces, and the characters + ( ) -"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
      {/* ContactFilter */}

      <div>
        <label>
          ContactFilter
          <input
            onChange={handleFilterTerm}
            value={filterTerm}
            type="text"
            placeholder="Search contacts"
          />
        </label>
      </div>
      {/* ContactList */}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <div>
        <ul>
          {filteredContacts &&
            filteredContacts.map(({ id, name, phone }) => {
              return (
                <li key={id}>
                  <h3>Name: {name}</h3>
                  <p>Phone: {phone}</p>
                  <button onClick={() => handleDeleteContact(id)}>
                    <FaTrashAlt />
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ContactForm;
