const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); //url is an integrated module in node
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); //added like this to avoid any problems with tests in the future

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    _.chain(req.body)
      .map(({ email, url }) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId, //in mongo it is an _id but mongoose respects the 'id' naming convention. but be safe with _id
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
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
