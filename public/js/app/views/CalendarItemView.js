// CalendarItemView.js
// --------
define(['react'],
  function(React) {
    var CalendarItemView = React.createClass({displayName: 'CalendarItemView',
      getDefaultProps: function() {
        return {
          className: 'calendar-view',
          selected: false
        };
      },

      onClick: function() {
        this.props.changeCalendar(this.props.name);
      },

      render: function() {
        var className = this.props.className;

        if (this.props.selected) {
          className += ' selected';
        }

        return (
          React.DOM.div({className: className, onClick: this.onClick},
            React.DOM.div(null, this.props.name)
          )
        );
      }
    });

    return CalendarItemView;
  }
);