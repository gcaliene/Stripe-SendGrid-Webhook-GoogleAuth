module.exports = (req, res, next) => {
  //next is what we call when our middleware is complete/finished running. it will pass the request of to the next middleware in the chain
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }
  //if the user is logged in then we want to pass along the request by using next()
  next();
};
