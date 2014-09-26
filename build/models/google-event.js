// Models
Backbone.GoogleEvent = Backbone.Model.extend({
  defaults: {
    author:     '',
    category:   '',
    calendarName: '',
    content:    '',
    date:       '',
    endTime:    '',
    id:         '',
    location:   '',
    link:       '',
    startTime:  '',
    title:      '',
    updated:    '',
    where:      '',
    yearMonth: '',
    yearMonthDay: ''
  },

  initialize: function() {
    this.set('yearMonth', app.Util.yearMonth(this.get('startTime')));

    this.set('yearMonthDay', this._getStartMoment().format('YYYY-MM-DD'));
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