const { MongoClient } = require('mongodb');
const collections = {};

const getCollections = () => {
  return collections;
};

const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  const db = client.db();

  collections.Contacts = db.collection('contacts');
  console.log('Database connection successful');
};

module.exports = {
  connectMongo,
  getCollections,
};
