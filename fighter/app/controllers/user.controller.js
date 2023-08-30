const publicBoard = (req, res) => {
  res.status(200).send('public contents');
};

const userBoard = (req, res) => {
  res.status(200).send('user contents');
};

const adminBoard = (req, res) => {
  res.status(200).send('admin board');
};
