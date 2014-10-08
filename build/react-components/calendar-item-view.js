/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarItemView = React.createClass({displayName: 'CalendarItemView',
  getDefaultProps: function() {
    return {
      className: 'calendar-view',
      selected: false
    };
  },

  onClick: function() {
    this.props.changeCalendar(this.props.name);
  },

  render: function() {
    var classNameSelected = this.props.selected ? 'selected' : '';

    return (
      React.DOM.div({className: this.props.className, onClick: this.onClick}, 
        React.DOM.div({className: classNameSelected}, this.props.name)
      )
    );
  }
});