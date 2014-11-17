// CalendarGridHeaderView.js
// --------
define(['react', 'views/CalendarGridHeaderRowView'],
  function(React, CalendarGridHeaderRowView) {

    var CalendarGridHeaderView = React.createClass({displayName: 'CalendarGridHeaderView',
      getDefaultProps: function() {
        return {
          className: 'week-header',
          // to-do, build these with moment's locale
          names: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        };
      },

      render: function() {
        return (
          React.DOM.div({className: this.props.className},
            CalendarGridHeaderRowView({names: this.props.names})
          )
        );
      }
    });

    return CalendarGridHeaderView;
  }
);