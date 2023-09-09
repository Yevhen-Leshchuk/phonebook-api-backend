/* eslint-disable no-undef */
const { Contact } = require('../db/contactModel');
const { WrongParametersError } = require('../helpers/errors');

const getContacts = async ({ skip, limit, favorite }) => {
  if (skip > 0 && !favorite) {
    const contacts = await Contact.find({})
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);

    return contacts;
  } else if (favorite) {
    const contacts = await Contact.find({})
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit)
      .where('favorite')
      .equals(favorite);

    return contacts;
  } else if (skip === 0) {
    const contacts = await Contact.find({})
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);

    return contacts;
  } else {
    contacts = await Contact.find({});
    return contacts;
  }
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(`No contact with id:${id} found`);
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};

const updateContactsById = async (id, { name, email, phone, favorite }) => {
  await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
};

const updateStatusContactById = async (id, { favorite }) => {
  await Contact.findByIdAndUpdate(id, {
    $set: { favorite },
  });
};

const deleteContactById = async (id) => {
  await Contact.findByIdAndRemove(id);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContactsById,
  deleteContactById,
  updateStatusContactById,
};
