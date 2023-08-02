const { connectMongo } = require('./src/db/connection');
const app = require('./app');

const PORT = process.env.PORT || 8081;

const start = async () => {
  await connectMongo();

  app.listen(PORT, (err) => {
    if (err) {
      console.log('Error at server launch:', err);
    }
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
