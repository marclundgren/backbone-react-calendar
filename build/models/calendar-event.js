// Models
Backbone.CalendarEvent = Backbone.Model.extend({
  defaults: {
    author:       '',
    category:     '',
    calendar:     '',
    content:      '',
    date:         '',
    endTime:      '',
    endMoment:    moment(), // alternatively, i could create a duration method and and endTime method...since i dont need to search against them. yeah do that...
    month:        '',
    year:         '',
    endTime:      '',
    id:           '',
    link:         '',
    startTime:    '',
    startMoment:  moment(),
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

  ends: function() {
    var endMoment = this._getEndMoment();

    return endMoment.format('YYYY MMMM DD hh:mm a');
  },

  starts: function() {
    var startMoment = this._getStartMoment();

    return startMoment.format('YYYY MMMM DD hh:mm a');
  },

  _getEndMoment: function() {
    return moment(this.get('endTime'));
  },

  _getStartMoment: function() {
    return moment(this.get('startTime'));
  },

  duration: function() {
    var startMoment = this._getStartMoment();
    var endMoment = this._getEndMoment();

    var unit = 'hours';

    var count = endMoment.diff(startMoment, unit);

    if (count >= 24) {
      unit = 'days'

      count = endMoment.diff(startMoment, unit);
    }

    return moment.duration(count, unit).humanize();
  }
});