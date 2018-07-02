import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

Meteor.methods({
  'messages.insert'(text) {
    check(text, String);

    // Check if user is logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    //var counter = Meteor.user().counter;
    Messages.insert({
      text,
      ceratedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      counter: Meteor.user().counter,
    });
  },
  'Messages.remove'(note) {
    check(note._id, String);

    if (note.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.remove(note._id);
  }
});
