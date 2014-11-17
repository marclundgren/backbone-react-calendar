// CalendarSourceOptionView.js
// --------
define(['react'],
  function(React) {

    var CalendarSourceOptionView = React.createClass({displayName: 'CalendarSourceOptionView',
      render: function() {
        return (
          React.DOM.option({value: this.props.name}, this.props.name)
        );
      }
    });

    return CalendarSourceOptionView;
  }
);