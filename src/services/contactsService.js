const { Contact } = require('../db/postModel');

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};

const updateContactsById = async (id, { name, email, phone, favorite }) => {
  if (name && email && phone && favorite) {
    await Contact.findByIdAndUpdate(id, {
      $set: { name, email, phone, favorite },
    });
  }
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
};
