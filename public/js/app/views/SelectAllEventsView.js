// MultiCalendarTitleView.js
// --------
define(['react'],
  function(React) {

    var SelectAllEventsView = React.createClass({displayName: 'SelectAllEventsView',
      getDefaultProps: function() {
        return {
          className: 'select-all-events',
          title: 'All Events',
          selected: false
        };
      },

      render: function() {
        var className = this.props.className;

        if (this.props.selected) {
          className += ' selected';
        }

        return (
          React.DOM.div({className: className, onClick: this.props.select},
            this.props.title
          )
        );
      }
    });

    return SelectAllEventsView;
  }
);