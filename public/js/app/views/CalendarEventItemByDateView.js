// CalendarEventItemByDateView.js
// --------
define(['react'],
  function(React) {

    var CalendarEventItemByDateView = React.createClass({displayName: 'CalendarEventItemByDateView',
      getDefaultProps: function() {
        return {
          className: 'row event event-by-date',
          columnClassName: 'col-xs-10 col-sm-10 col-md-11 col-lg-11',
          rowClassName: 'row',
          startsClassName: 'col-xs-12 col-sm-2 col-md-2 col-lg-2 starts',
          contentClassName: 'col-xs-12 col-sm-10 col-md-10 col-lg-10 content',
          headerTitleClassName: 'title',
          locationClassName: 'location',
          arrowClassName: 'col-xs-2 col-sm-2 col-md-1 col-lg-1 arrow',
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