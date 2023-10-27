import { createSelector } from '@reduxjs/toolkit';

const selectContactsStore = state => state.contactsStore;
export const selectContact = createSelector(
  selectContactsStore,
  contactsStore => contactsStore.items
);

export const selectContactIsLoading = createSelector(
  selectContactsStore,
  contactsStore => contactsStore.isLoading
);

export const selectContactError = createSelector(
  selectContactsStore,
  contactsStore => contactsStore.error
);

export const selectContactFilter = createSelector(
  selectContactsStore,
  contactsStore => contactsStore.filterTerm
);
// export const selectContactIsLoading = state => state.contactsStore.isLoading;
// export const selectContactError = state => state.contactsStore.error;
// export const selectContactFilter = state => state.contactsStore.filterTerm;
