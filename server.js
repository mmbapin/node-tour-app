const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD_ENC,
);

console.log('DB', DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful !');
  })
  .catch((err) => {
    if (err.name === 'MongoParseError') {
      console.error(
        'There was a problem with the connection string:',
        err.message,
      );
      // Identify unsupported options
      const unsupportedOptions = err.message.match(/not supported: (.+)$/);
      if (unsupportedOptions) {
        console.error('Unsupported options:', unsupportedOptions[1]);
      }
    } else {
      console.error('Error connecting to MongoDB:', err);
    }
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
