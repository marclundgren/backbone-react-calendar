// EventIndicatorView.js
// --------
define(['react'],
  function(React) {

    var EventIndicatorView = React.createClass({displayName: 'EventIndicatorView',
      render: function() {
        var className = 'event-indicator';

        if (this.props.hasEvents) {
          className += ' has-events';
        }

        return (
          React.DOM.div({className: className})
        );
      }
    });

    return EventIndicatorView;
  }
);