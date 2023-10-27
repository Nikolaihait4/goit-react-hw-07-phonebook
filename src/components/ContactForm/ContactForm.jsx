import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, fetchContacts } from 'redux/contactReduser';
import { selectContact } from 'redux/contactsSelector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineUserAdd } from 'react-icons/ai';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = e => {
    e.preventDefault();

    if (!name || !phone) {
      toast.error('Please fill in both name and phone fields.', {
        position: 'top-right',
        autoClose: 3000,
      });

      return;
    }

    const existingContact = contacts.find(contact => contact.name === name);

    if (existingContact) {
      toast.error('Contact with the same name already exists.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setName('');
      setPhone('');
      return;
    }

    const newContact = {
      name,
      phone,
    };

    dispatch(addContact(newContact));
    toast.success('Contact added successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });

    setName('');
    setPhone('');
  };

  return (
    <div className={css.contactsContainer}>
      <h2 className={css.contactsTitle}>Contact Form</h2>
      <form onSubmit={handleAddContact} className={css.contactsForm}>
        <label className={css.contactNameLabel}>
          <h4 className={css.labelTitle}>Name</h4>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className={css.contactNameInput}
          />
        </label>
        <label className={css.contactPhoneLabel}>
          <h4 className={css.labelTitle}>Phone</h4>
          <input
            type="tel"
            name="phone"
            pattern="\+?[0-9\s\-\(\)]+"
            title="Phone number must contain only digits, spaces, and the characters + ( ) -"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className={css.contactPhoneInput}
          />
        </label>
        <button type="submit" className={css.addButton}>
          Add Contact
          <AiOutlineUserAdd />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
