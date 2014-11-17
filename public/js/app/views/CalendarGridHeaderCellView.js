// CalendarGridHeaderCellView.js
// --------
define(['react'],
  function(React) {

    var CalendarGridHeaderCellView = React.createClass({displayName: 'CalendarGridHeaderCellView',
      getDefaultProps: function() {
        return {
          className: 'grid-cell',
          name: ''
        };
      },

      render: function() {
        return (
          React.DOM.div({className: this.props.className},
            React.DOM.div(null,
              React.DOM.div(null,
                React.DOM.span(null, this.props.name)
              )
            )
          )
        );
      }
    });

    return CalendarGridHeaderCellView;
  }
);