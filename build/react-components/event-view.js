/**
 * @jsx React.DOM
 */

var app = app || {};

app.EventView = React.createBackboneClass({
  calendar: function() {
    this.props.router.navigate('', {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    if (!model) {
      debugger;
    }

    return (
      React.DOM.div(null, 
        React.DOM.div({onClick: this.calendar, className: "back"}, "< back"), 
        React.DOM.h3(null, model.get('title')), 
        React.DOM.div(null, model.get('description'))
      )
    );
  }
});