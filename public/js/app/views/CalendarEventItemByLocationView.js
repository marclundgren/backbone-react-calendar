// CalendarEventItemByLocationView.js
// --------
define(['react'],
  function(React) {

    var CalendarEventItemByLocationView = React.createClass({displayName: 'CalendarEventItemByLocationView',
      getDefaultProps: function() {
        return {
          className: 'row event event-by-location',
          columnClassName: 'col-xs-10 col-sm-10 col-md-11 col-lg-11',
          rowClassName: 'row',
          locationClassName: 'col-xs-12 col-sm-4 col-lg-3 location',
          contentClassName: 'col-xs-12 col-sm-8 col-lg-9 content',
          arrowClassName: 'col-xs-2 col-sm-2 col-md-1 col-lg-1 arrow',
          iconClassName: 'glyphicon glyphicon-chevron-right',
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