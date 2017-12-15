const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); //added like this to avoid any problems with tests in the future

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title: title, //es5 syntax
      subject, //es6 syntax
      body, //es6 syntax
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id, //we don't have to define it in the schema it is a prop defined in any mongoose mongo model
      dateSent: Date.now()
    });

    //Sending the Email Now
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user); //to update the user model specifically to the credits, the same way user gets more credits
    } catch (error) {
      //422 unprocessible entity
      res.status(422).send(error);
    }
  });
};
