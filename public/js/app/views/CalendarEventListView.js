// CalendarEventListView.js
// --------
define(['react', 'underscore.guid', 'views/CalendarEventItemView'],
  function(React, _, CalendarEventItemView) {

    var CalendarEventListView = React.createClass({displayName: 'CalendarEventListView',
        getDefaultProps: function() {
          return {
            calendar: '',
            className: 'calendar-event-list',
            containerClassName: 'col-xs-12 col-sm-6 col-md-6 col-lg-9 event-list-container',
            eventListHeaderClassName: 'event-list-header',
            eventsTitleClassName: 'events-title',
            selectClassName: 'form-control',
            noEventsClassName: 'no-events',
            sortClassName: 'sort',
            events: [],
            sortable: false,
            title: 'All Events',
            sortHeaderText: 'Sort by',
            selectRefName: 'sortValue',
            startTimeText: 'Date',
            titleText: 'Title',
            locationText: 'Location',
            selectName: 'sortvalue',
            noEventsMessage: 'I could not find any events.'
          };
        },

        getInitialState: function() {
          return {
            sortValue: 'startTime'
          };
        },

        title: function() {
          var title;

          if (this.props.date) {
            title = this.props.date.format('MMMM DD');

            if (this.props.calendar) {
              title = this.props.calendar + ' - ' + title;
            }
          }
          else if(this.props.calendar) {
            title = this.props.calendar;
          }
          else {
            title = this.props.title;
          }

          return title;
        },

        createEntry: function (entry) {
          return (
            CalendarEventItemView({
              calendar: this.props.calendar,
              duration: entry.duration(),
              eventLink: this.props.eventLink,
              id: entry.get('id'),
              key: _.guid(),
              location: entry.get('location'),
              model: entry,
              sortKey: this.state.sortValue,
              startMoment: entry.startMoment(),
              starts: entry.starts(),
              title: entry.get('title')
            })
          );
        },

        onChange: function() {
          var sortValue = this.refs.sortValue.getDOMNode().value;

          this.setState({sortValue: sortValue});
        },

        selectSort: function() {
          return (
            React.DOM.div({className: this.props.sortClassName},
              React.DOM.h5(null, this.props.sortHeaderText),

              React.DOM.select({className: this.props.selectClassName, ref: this.props.selectRefName, value: this.state.sortValue, name: this.props.selectName, onChange: this.onChange},
                React.DOM.option({value: 'startTime'}, this.props.startTimeText),
                React.DOM.option({value: 'title'}, this.props.titleText),
                React.DOM.option({value: 'location'}, this.props.locationText)
              )
            )
          );
        },

        render: function () {
          var sortable = this.props.sortable;

          var sortElement;
          var sortValue;

          if (sortable && this.props.events.length > 1) {
            sortElement = this.selectSort();

            sortValue = this.state.sortValue;
          }
          else {
            sortValue = 'startTime';
          }

          var eventsSorted = this.props.events.sortBy(sortValue);

          var noEvents;

          if (eventsSorted.length === 0) {
             noEvents = this.props.noEventsMessage;
          }

          return (
            React.DOM.div({className: this.props.containerClassName},
              React.DOM.div({className: this.props.eventListHeaderClassName},
                React.DOM.h3({className: this.props.eventsTitleClassName}, this.title()),
                sortElement
              ),

              React.DOM.div({className: this.props.className}, eventsSorted.map(this.createEntry)),

              React.DOM.div({className: this.props.noEventsClassName}, noEvents)
            )
          );
        }
    });

    return CalendarEventListView;
  }
);