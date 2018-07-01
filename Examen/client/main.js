import { Template } from 'meteor/templating';
import { Messages } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

// Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
  /*
  messages:[
    {text:'My Note 1'},
    {text:'My Note 2'},
    {text:'My Note 3'}
  ]
  */
  messages(){
    return Messages.find({});
  }
});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();

    // Get input value
    const target = event.target;
    const text = target.text.value;

    // Insert note into collection
    /*
    Messages.insert({
      text,
      ceratedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    */
    Meteor.call('messages.insert', text);

    // Clear form
    target.text.value = '';

    // Close modal
    $('#addModal').modal('close');

    return false;
  }
});

Template.note.events({
  'click .delete-note':function(){
    //Messages.remove(this._id);
    Meteor.call('messages.remove', this);
    return false;
  }
});
