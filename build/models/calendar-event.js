// Models
Backbone.CalendarEvent = Backbone.Model.extend({
  defaults: {
    author:     '',
    category:   '',
    calendar: '',
    content:    '',
    date:       '',
    endTime:    '',
    id:         '',
    link:       '',
    startTime:  '',
    title:      '',
    updated:    '',
    location:      '',
    week:      '',
    yearMonth: ''
  },

  initialize: function() {
    this.set('yearMonth', this.get('startTime')); //todo: remove?

    var startMoment = this._getStartMoment();

    this.set('week', startMoment.week());
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