/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.SelectedEventsView = React.createClass({displayName: 'SelectedEventsView',
  getDefaultProps: function() {
    return {
      className: 'col-xs-12 col-sm-6 col-md-6 col-lg-9 selected-events-view',
      title: 'Events',
      calendar: '',
      subtitle: ''
    };
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.className}, 
        app.EventsView({events: this.props.events, title: this.props.title, subtitle: this.props.subtitle, router: this.props.router})
      )
    );
  }
});