// CalendarControlsView.js
// --------
define(['react', 'moment'],
  function(React, moment) {

    var CalendarControlsView = React.createClass({displayName: 'CalendarControlsView',
      getDefaultProps: function() {
        return {
          date: moment(),
          className: 'calendar-controls',
          prevClassName: 'control-previous',
          arrowClassName: 'arrow',
          titleClassName: 'title',
          nextClassName: 'control-next'
        };
      },

      next: function() {
        var date = this.props.date.clone();

        this.props.onNext(date.startOf('month').add(1, 'month'));
      },

      prev: function() {
        var date = this.props.date.clone();

        this.props.onPrev(date.startOf('month').subtract(1, 'month'));
      },

      render: function() {
        var props = this.props;

        return (
          React.DOM.nav({className: props.className},
            React.DOM.div({className: props.prevClassName, onClick: this.prev},
              React.DOM.div({className: props.arrowClassName})
            ),
            React.DOM.h3({className: props.titleClassName}, this.props.date.format('MMMM YYYY')),
            React.DOM.div({className: props.nextClassName, onClick: this.next},
              React.DOM.div({className: props.arrowClassName})
            )
          )
        );
      }
    });

    return CalendarControlsView;
  }
);