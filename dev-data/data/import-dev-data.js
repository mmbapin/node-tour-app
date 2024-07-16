const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD_ENC,
);

mongoose.connect(DB, {}).then(() => console.log('DB connection successful'));

const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//Import Data info DB
const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('Data successfully loaded !');
  } catch (error) {
    console.log('Error From Import Dev Data :', error);
  }
  process.exit();
};

//Delete All data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted !');
  } catch (error) {
    console.log('Error From Delete Data :', error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
