const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // by convention its _user. the 'ref' belongs to the user collection
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema); //this registers to mongoose which is something that won't get done to recipients
