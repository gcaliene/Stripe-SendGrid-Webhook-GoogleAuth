module.exports = (req, res, next) => {
  //next is what we call when our middleware is complete/finished running. it will pass the request of to the next middleware in the chain
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  //if the user is logged in then we want to pass along the request by using next()
  next();
};
