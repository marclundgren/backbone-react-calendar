// Models
Backbone.CalendarEvent = Backbone.Model.extend({
  defaults: {
    author:       '',
    category:     '',
    calendar:     '',
    content:      '',
    date:         '',
    month:        '',
    year:         '',
    endTime:      '',
    id:           '',
    link:         '',
    startTime:    '',
    title:        '',
    updated:      '',
    location:     '',
    week:         '',
    yearMonth:    '',
    yearMonthDay: ''
  },

  initialize: function() {
    var startMoment = this._getStartMoment();

    // this.set('week', startMoment.week());
    // this.set('yearMonth', startMoment.format('YYYY-MM'));
    // this.set('yearMonthDay', startMoment.format('YYYY-MM-DD'));
  },

  starts: function() {
    var startMoment = this._getStartMoment();

    return startMoment.format('YYYY MMMM DD hh:mm a');
  },

  _getStartMoment: function() {
    return moment(this.get('startTime'));
  },

  duration: function() {
    var startMoment = this._getStartMoment();
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