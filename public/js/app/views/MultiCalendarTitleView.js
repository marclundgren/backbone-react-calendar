// MultiCalendarTitleView.js
// --------
define(['react'],
  function(React) {

    var MultiCalendarTitleView = React.createClass({displayName: 'MultiCalendarTitleView',
      getDefaultProps: function() {
        return {
          className: 'multi-calendar-title',
          title: 'Multi Calendar',

          today: function() {}
        };
      },

      render: function() {
        return (
          React.DOM.div({className: this.props.className, onClick: this.props.today},
            React.DOM.h1(null,
              this.props.title
            )
          )
        );
      }
    });

    return MultiCalendarTitleView;
  }
);