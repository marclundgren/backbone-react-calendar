// CalendarEventItemByTitleView.js
// --------

define(['backbone', 'react'],
  function(Backbone, React) {

    var CalendarEventItemByTitleView = React.createClass({displayName: 'CalendarEventItemByTitleView',
      getDefaultProps: function() {
        return {
          className: 'row-fluid event event-by-title',
          columnClassName: 'span10',
          rowClassName: 'row-fluid',
          contentClassName: 'span10 content',
          headerTitleClassName: 'title',
          locationClassName: 'span10 location',
          startsClassName: 'span2 starts',
          arrowClassName: 'span2 arrow',
          iconClassName: 'icon icon-chevron-right',
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