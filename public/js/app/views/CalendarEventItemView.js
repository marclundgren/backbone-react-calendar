// CalendarEventItemView.js
// --------
define(['reactbackbone', 'moment', 'views/CalendarEventItemByDateView', 'views/CalendarEventItemByLocationView', 'views/CalendarEventItemByTitleView'],
  function(React, moment, CalendarEventItemByDateView, CalendarEventItemByLocationView, CalendarEventItemByTitleView) {

    var CalendarEventItemView = React.createBackboneClass({
      getDefaultProps: function() {
        return {
          eventLink: function() {},
          date: null,
          duration: '',
          id: '',
          sortKey: 'startTime',
          location: '',
          startMoment: moment(),
          starts: '',
          title: '',
          errorMessage: 'I did not understand that sort key.'
        };
      },

      // todo, bind a single onClick to be used by each of these items

      // onClick: function() {
      //   this.props.eventLink(this.props.calendar, this.props.id);
      // },

      render: function() {
        var props = this.props;
        var sortKey = props.sortKey;

        var calendar = this.getModel().get('calendar');

        if (sortKey === 'startTime') {
          return CalendarEventItemByDateView({
            calendar: calendar,
            eventLink: props.eventLink,
            id: props.id,
            starts: props.startMoment.format('hh:mm a'),
            location: props.location,
            title: props.title});
        }
        else if (sortKey === 'location') {
          return CalendarEventItemByLocationView({
            calendar: calendar,
            eventLink: props.eventLink,
            id: props.id,
            location: props.location,
            starts: props.startMoment.format('hh:mm a'),
            title: props.title});
        }
        else if (sortKey === 'title') {
          return CalendarEventItemByTitleView({
            calendar: calendar,
            eventLink: props.eventLink,
            id: props.id,
            location: props.location,
            starts: props.startMoment.format('hh:mm a'),
            title: props.title});
        }

        return (
          React.DOM.div(null,
            this.props.errorMessage
          )
        );
      }
    });

    return CalendarEventItemView;
  }
);