// InvalidDateView.js
// --------
define(['react'],
  function(React) {

    var InvalidDateView = React.createClass({displayName: 'InvalidDateView',
      getDefaultProps: function() {
        return {
          message: 'Invalid Date.'
        };
      },

      render: function() {
        return (React.DOM.div(null, this.props.message));
      }
    });

    return InvalidDateView;
  }
);