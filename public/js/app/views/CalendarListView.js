// CalendarListView.js
// --------
define(['react', 'underscore.guid'],
  function(React, _) {

    var CalendarListView = React.createClass({displayName: 'CalendarListView',
      getDefaultProps: function() {
        return {
          active: false,
          className: 'col-md-12 calendar-list',
          defaultValue: '',
          headerText: 'Filter by',
          optionText: 'All',
          optionValue: '',
          selectClassName: 'form-control',
          selectRefName: 'select'
        };
      },

      createCalendarOption: function(item) {
        return (
          React.DOM.option({
            key: _.guid(),
            value: item
          }, item)
        );
      },

      onChange: function() {
        var val = this.refs.select.getDOMNode().value;

        this.props.changeCalendar(val);
      },

      render: function() {
        var className = this.props.className;

        if (this.props.active) {
          className += ' active';
        }

        return (
          React.DOM.div(null,
            React.DOM.h4(null, this.props.headerText),
            React.DOM.select({defaultValue: this.props.defaultValue, value: this.props.selected, ref: this.props.selectRefName, className: this.props.selectClassName, onChange: this.onChange},
              React.DOM.option({value: this.props.optionValue}, this.props.optionText),
              this.props.calendars.map(this.createCalendarOption)
            )
          )
        );
      }
    });

    return CalendarListView;
  }
);