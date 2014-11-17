// CalendarGridBodyCellView.js
// --------
define(['react', 'moment', 'views/EventIndicatorView'],
  function(React, moment, EventIndicatorView) {

    var CalendarGridBodyCellView = React.createClass({displayName: 'CalendarGridBodyCellView',
      getDefaultProps: function() {
        return {
          activeDay: false,
          activeMonth: false,
          activeWeek: false,
          className: 'grid-cell',
          date: '',
          events: [],
          fullDate: '',
          moment: moment(),
          week: ''
        };
      },

      getInitialState: function() {
        return {
          selected: this.props.activeDay
        };
      },

      onClick: function() {
        this.props.onGridSelect(this);
      },

      render: function() {
        var className = '';

        if (this.props.activeMonth) {
          className += ' active-month';

          if (this.props.activeDay) {
            className += ' circle active-day';
          }
        }

        return (
          React.DOM.div({className: this.props.className, onClick: this.onClick},
            React.DOM.div({className: className},
              React.DOM.div(null,
                React.DOM.span(null, this.props.date.date())
              ),

              EventIndicatorView({hasEvents: this.props.events.length})
            )
          )
        );
      }
    });

    return CalendarGridBodyCellView;
  }
);