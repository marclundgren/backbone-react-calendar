// Models
Backbone.CalendarEvent = Backbone.Model.extend({
  defaults: {
    author:       '',
    category:     '',
    calendar:     '',
    content:      '',
    date:         '',
    endTime:      '',
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
    // this.set('week', startMoment.week());
    // this.set('yearMonth', startMoment.format('YYYY-MM'));
    // this.set('yearMonthDay', startMoment.format('YYYY-MM-DD'));
  },

  startMoment: function() {
    var startMoment = this.get('startMoment');

    if (!startMoment || !moment.isMoment(startMoment)) {
      startMoment = moment(this.get('startTime'));

      // this.set('startMoment', startMoment);

      // the proceeding code results in the following runtime error

      // Uncaught Error: Invariant Violation: forceUpdate(...): Cannot force an update while unmounting component or during an existing state transition (such as within `render`).

      this.set('startMoment', startMoment, {silent: true});
    }

    return startMoment;
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
    var endMoment = this._getEndMoment();

    return endMoment.format('YYYY MMMM DD hh:mm a');
  },

  starts: function() {
    var startMoment = this._getStartMoment();

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