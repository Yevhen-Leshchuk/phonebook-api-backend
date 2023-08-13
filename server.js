const { connectMongo } = require('./src/db/connection');
const app = require('./app');

const PORT = process.env.PORT || 8081;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (error) => {
      if (error) {
        console.log('Error at server launch:', error);
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application witch error ${error.message}`);
    process.exit(1);
  }
};

start();
