// CalendarEventItemByTitleView.js
// --------

define(['backbone', 'react'],
  function(Backbone, React) {

    var CalendarEventItemByTitleView = React.createClass({displayName: 'CalendarEventItemByTitleView',
      getDefaultProps: function() {
        return {
          className: 'row-fluid event event-by-title',
          columnClassName: 'col-xs-10 col-sm-10 col-md-11 col-lg-11',
          rowClassName: 'row-fluid',
          contentClassName: 'col-xs-12 col-sm-8 col-md-10 col-lg-10 content',
          headerTitleClassName: 'title',
          locationClassName: 'col-xs-12 col-sm-9 col-lg-9 location',
          startsClassName: 'col-xs-12 col-sm-4 col-md-2 col-lg-2 starts',
          arrowClassName: 'col-xs-2 col-sm-2 col-md-1 col-lg-1 arrow',
          iconClassName: 'glyphicon glyphicon-chevron-right',
          calendar: '',
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

                React.DOM.div({className: props.contentClassName},
                  React.DOM.h4({className: props.headerTitleClassName},
                    props.title
                  )
                ),

                React.DOM.div({className: props.locationClassName},
                  props.location
                ),

                React.DOM.div({className: props.startsClassName},
                  props.starts
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

    return CalendarEventItemByTitleView;
  }
);