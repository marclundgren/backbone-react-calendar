// Models
Backbone.CalendarEvent = Backbone.Model.extend({
  defaults: {
    author:       '',
    category:     '',
    calendar:     '',
    content:      '',
    date:         '',
    fullDate:     '',
    endTime:      '',
    month:        '',
    year:         '',
    endTime:      '',
    id:           '',
    link:         '',
    startTime:    '',
    title:        '',
    updated:      '',
    location:     'No location specificied.',
    week:         '',
    yearMonth:    '',
    yearMonthDay: ''
  },

  initialize: function() {
    if (!this.get('fullDate')) {
      this.set('fullDate', this.startMoment().format('YYYY-MM-DD'));
    }
  },

  startMoment: function() {
    var startMoment = this.get('startMoment');

    if (!startMoment || !moment.isMoment(startMoment)) {
      startMoment = moment(this.get('startTime'));

      this.set('startMoment', startMoment, {silent: true});
    }

    return startMoment;
  },

  month: function() {
    return this.startMoment().format('YYYY-MM');
  },

  week: function() {
    return this.startMoment().week();
  },

  endMoment: function() {
    var endMoment = this.get('endMoment');

    if (!endMoment || !moment.isMoment(endMoment)) {
      endMoment = moment(this.get('endTime'));

      this.set('endMoment', endMoment);
    }

    return endMoment;
  },

  ends: function() {
    var endMoment = this.endMoment();

    return endMoment.format('YYYY MMMM DD hh:mm a');
  },

  starts: function() {
    var startMoment = this.startMoment();

    return startMoment.format('YYYY MMMM DD hh:mm a');
  },

  duration: function() {
    var startMoment = this.startMoment();
    var endMoment = this.endMoment();

    var unit = 'hours';

    var count = endMoment.diff(startMoment, unit);

    if (count >= 24) {
      unit = 'days'

      count = endMoment.diff(startMoment, unit);
    }

    return moment.duration(count, unit).humanize();
  }
});