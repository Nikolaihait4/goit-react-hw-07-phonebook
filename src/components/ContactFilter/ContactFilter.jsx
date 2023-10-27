import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterTerm } from 'redux/contactReduser';
import { selectContactFilter } from 'redux/contactsSelector';
import css from './ContactFilter.module.css';

const ContactFilter = () => {
  const dispatch = useDispatch();
  const filterTerm = useSelector(selectContactFilter);

  const handleFilterTerm = value => {
    dispatch(setFilterTerm(value));
  };

  return (
    <div className={css.filterContainer}>
      <label className={css.filterLabel}>
        <h4 className={css.filterTitle}>Search Contact</h4>
        <input
          onChange={e => handleFilterTerm(e.target.value)}
          value={filterTerm}
          type="text"
          placeholder="Search contacts"
          className={css.filterInput}
        />
      </label>
    </div>
  );
};

export default ContactFilter;
