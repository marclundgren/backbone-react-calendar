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
      subtitle: ''
    };
  },

  view: function() {
    var events;

    var date = this.props.date;
    var month = this.props.month;
    var year = this.props.year;
    var events = this.props.events;

    // console.log('SelectedEventsView this.props: ', this.props);

    // debugger;

    var title, subtitle;

    // var events = model.getEvents({
    //   calendar: this.props.calendar,
    //   date: this.props.date,
    //   month: this.props.month,
    //   year: this.props.year
    // });

    // if (date) {
    //   title = 'Day Events';
    //   subtitle = date;
    // }
    // else if (month) {
    //   title = 'Month Events';
    //   subtitle = month;
    // }
    // else if (year) {
    //   title = 'Year Events';
    //   subtitle = year;
    // }
    // else {
    //   title = 'Year Events';
    //   subtitle = calendar;
    // }

    if (date) {
      // subtitle = date.format('MMMM DD, YYYY');
    }
    // else if (month) {
    //   title = 'Month Events';
    //   subtitle = month.format('MMMM, YYYY');
    // }
    // else if (year) {
    //   title = 'Year Events';
    //   subtitle = year.format('YYYY');
    // }
    // else {
    //   title = 'Year Events';
    //   subtitle = year.format('YYYY');
    // }

    return (
      app.EventsView({events: events, title: this.props.title, subtitle: this.props.subtitle, router: this.props.router})
    );
  },

  render: function() {
    var view = this.view();

    return (
      React.DOM.div({className: this.props.className}, 
        view
      )
    );
  }
});