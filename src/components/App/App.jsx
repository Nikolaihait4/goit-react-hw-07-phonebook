import ContactFilter from 'components/ContactFilter/ContactFilter';
import ContactForm from 'components/ContactForm/ContactForm';

import ContactList from 'components/ContactList/ContactList';
import { ToastContainer } from 'react-toastify';

import css from './App.module.css';

const App = () => {
  return (
    <div className={css.mainContainer}>
      <h1 className={css.mainTitle}>Phonebook</h1>
      <ContactForm />
      <ContactFilter />
      <ContactList />
      <ToastContainer />
    </div>
  );
};

export default App;
