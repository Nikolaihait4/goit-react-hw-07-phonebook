import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  requestAddContacts,
  requestContacts,
  requestDeleteContacts,
} from 'services/api';

export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await requestContacts();
      //   console.log(contacts);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkAPI) => {
    try {
      const contact = await requestAddContacts(newContact);
      //   console.log(contact);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletContact = createAsyncThunk(
  'contacts/delete',
  async (contacttId, thunkAPI) => {
    try {
      const contact = await requestDeleteContacts(contacttId);
      //   console.log(contact);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  items: null,
  isLoading: false,
  error: null,
  filterTerm: '',
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  reducers: {
    setFilterTerm: (state, action) => {
      state.filterTerm = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deletContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setFilterTerm } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
