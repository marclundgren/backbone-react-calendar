// CalendarEventItemByLocationView.js
// --------
define(['react'],
  function(React) {

    var CalendarEventItemByLocationView = React.createClass({displayName: 'CalendarEventItemByLocationView',
      getDefaultProps: function() {
        return {
          className: 'row-fluid event event-by-location',
          columnClassName: 'span10',
          rowClassName: 'row-fluid',
          locationClassName: 'span4',
          contentClassName: 'span8 content',
          arrowClassName: 'span2 arrow',
          iconClassName: 'icon icon-chevron-right',
          titleClassName: 'title',
          startsClassName: 'starts',
          calendar: '',
          location: '',
          starts: '',
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
                React.DOM.div({className: props.locationClassName},
                  this.props.location
                ),

                React.DOM.div({className: props.contentClassName},
                  React.DOM.h4({className: props.titleClassName},
                    this.props.title
                  ),

                  React.DOM.div({className: props.startsClassName},
                    this.props.starts
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

    return CalendarEventItemByLocationView;
  }
);