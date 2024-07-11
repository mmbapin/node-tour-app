const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log('Time :', req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

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
};

exports.getTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
