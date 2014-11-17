// CalendarGridBodyRowView.js
// --------
define(['react', 'underscore.guid', 'views/CalendarGridBodyCellView'],
  function(React, _, CalendarGridBodyCellView) {

    var CalendarGridBodyRowView = React.createClass({displayName: 'CalendarGridBodyRowView',
      getDefaultProps: function() {
        return {
          className: 'row'
        };
      },

      createCell: function(item) {
        return (
          CalendarGridBodyCellView({
            activeDay: item.get('activeDay'),
            activeMonth: item.get('activeMonth'),
            activeWeek: item.get('activeWeek'),
            date: item.get('moment'),
            events: item.get('events'),
            fullDate: item.get('fullDate'),
            key: _.guid(),
            onGridSelect: this.props.onGridSelect})
        );
      },

      render: function() {
        return (
          React.DOM.div({className: this.props.className},
            this.props.dates.map(this.createCell)
          )
        );
      }
    });

    return CalendarGridBodyRowView;
  }
);