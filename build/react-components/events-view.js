/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.EventsView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      title: 'Events',
      subtitle: ''
    };
  },

  createEvent: function(item) {
    if (!this.props.router) {
      return (React.DOM.div(null, "No router."));
    }

    // debugger;

    return (
      React.DOM.div(null, 
        app.EventPreviewView({router: this.props.router, model: item})
      )
    );
  },

  render: function() {
    var events = this.props.events || [];
    // console.log('EventsView this.props: ', this.props);



    if (events.length) {
      events = events.map(this.createEvent);
    }
    else {
      events = 'I could not find any events.';
    }

    return (
      React.DOM.div(null, 
        React.DOM.h2(null, this.props.title), 
        React.DOM.h4(null, this.props.subtitle), 
        React.DOM.div(null, events)
      )
    );
  }
});