// CalendarEventItemByDateView.js
// --------
define(['react'],
  function(React) {

    var CalendarEventItemByDateView = React.createClass({displayName: 'CalendarEventItemByDateView',
      getDefaultProps: function() {
        return {
          className: 'row-fluid event event-by-date',
          columnClassName: 'span10',
          rowClassName: 'row-fluid',
          startsClassName: 'span2 starts',
          contentClassName: 'span10 content',
          headerTitleClassName: 'title',
          locationClassName: 'location',
          arrowClassName: 'span2 arrow',
          iconClassName: 'glyphicon glyphicon-chevron-right',
          calendar: '',
          starts: '',
          location: '',
          title: ''
        };
      },

      onClick: function() {
        this.props.eventLink(this.props.calendar, this.props.id);
      },

      render: function() {
        var props = this.props;

        return (
          React.DOM.div({className: props.className, onClick: this.onClick},
            React.DOM.div({className: props.columnClassName},
              React.DOM.div({className: props.rowClassName},
                React.DOM.div({className: props.startsClassName},
                  this.props.starts
                ),

                React.DOM.div({className: props.contentClassName},
                  React.DOM.h4({className: props.headerTitleClassName},
                    this.props.title
                  ),

                  React.DOM.div({className: props.locationClassName},
                    this.props.location
                  )
                )
              )
            ),

            React.DOM.div({className: props.arrowClassName},
              React.DOM.i({className: props.iconClassName})
            )
          )
        );
      }
    });

    return CalendarEventItemByDateView;
  }
);