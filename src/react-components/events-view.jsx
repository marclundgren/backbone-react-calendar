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
      return (<div>No router.</div>);
    }

    // debugger;

    return (
      <div>
        <app.EventPreviewView router={this.props.router} model={item} />
      </div>
    );
  },

  render: function() {
    var events = this.props.events || [];

    if (events.length) {
      events = events.map(this.createEvent);
    }
    else {
      events = 'I could not find any events.';
    }

    return (
      <div>
        <h2>{this.props.title}</h2>
        <h4>{this.props.subtitle}</h4>
        <div>{events}</div>
      </div>
    );
  }
});