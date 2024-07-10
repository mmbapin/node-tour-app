const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side.', app: 'Natours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  //   console.log(newTour);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //   res.send('Done');
});

app.get('/api/v1/tours/:id', (req, res) => {
  //   console.log(req.params);

  const tourId = Number(req.params.id);

  if (tourId > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invaild Id',
      devMessage: "This id doesn't exist in database",
    });
  }

  const tour = tours.find((el) => el.id === tourId);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
