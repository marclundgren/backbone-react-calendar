/**
 * @jsx React.DOM
 */

var app = app || {};

app.EventView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNametoCalendar: 'event-view-to-calendar',
      classNameContent: 'event-view-content',
      classNameTitle: 'event-view-title',
      title: 'Show Calendar'
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
      React.DOM.div({className: "container"}, 
        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-xs-12 col-sm-12 col-sm-12", onClick: this.toCalendar, className: this.props.classNametoCalendar}, 
            this.props.title
          ), 

          React.DOM.div({className: "col-xs-12 col-sm-12 col-sm-12"}, 
            React.DOM.h3({className: this.props.classNameTitle}, model.get('title')), 

            React.DOM.div({className: this.props.classNameContent}, model.get('content'))
          )
        )
      )
    );
  }
});