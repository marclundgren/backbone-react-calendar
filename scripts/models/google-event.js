// app namespace
var app = app || {};

// Models
app.GoogleEvent = Backbone.Model.extend({
  defaults: {
    author:     '',
    category:   '',
    content:    '',
    date:       '',
    endTime:    '',
    id:         '',
    location:   '',
    link:       '',
    startTime:  '',
    title:      '',
    updated:    '',
    where:      ''
  },

  starts: function() {
    var startMoment = moment(this.get('startTime'));

    return startMoment.format('YYYY MMMM DD hh:mm a');
  },

  duration: function() {
    var startMoment = moment(this.get('startTime'));
    var endMoment = moment(this.get('endTime'));

    var unit = 'hours';

    var count = endMoment.diff(startMoment, unit);

    if (count >= 24) {
      unit = 'days'

      count = endMoment.diff(startMoment, unit);
    }

    return moment.duration(count, unit).humanize();
  }
});

app.GoogleEventList = Backbone.Collection.extend({
  model: app.GoogleEvent
});