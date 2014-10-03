/**
 * @jsx React.DOM
 */

var app = app || {};

app.EventView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNametoCalendar: 'event-view-to-calendar',
      classNameContent: 'event-view-content',
      classNameTitle: 'event-view-title'
    };
  },

  toCalendar: function() {
    this.props.router.navigate('', {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    return (
      React.DOM.div(null, 
        React.DOM.div({onClick: this.toCalendar, className: this.props.classNametoCalendar}, "< back"), 

        React.DOM.h3({className: this.props.classNameTitle}, model.get('title')), 

        React.DOM.div({className: this.props.classNameContent}, model.get('content'))
      )
    );
  }
});