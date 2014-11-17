// CalendarGridHeaderRowView.js
// --------
define(['react', 'underscore.guid', 'views/CalendarGridHeaderCellView'],
  function(React, _, CalendarGridHeaderCellView) {

    var CalendarGridHeaderRowView = React.createClass({displayName: 'CalendarGridHeaderRowView',
      getDefaultProps: function() {
        return {
          className: 'row',
          names: []
        };
      },

      createCell: function(item) {
        return new CalendarGridHeaderCellView({
          key: _.guid(),
          name: item
        });
      },

      render: function() {
        return (
          React.DOM.div({className: this.props.className},
            this.props.names.map(this.createCell)
          )
        );
      }
    });

    return CalendarGridHeaderRowView;
  }
);