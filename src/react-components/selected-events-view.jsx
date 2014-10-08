/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.SelectedEventsView = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'col-xs-12 col-sm-6 col-md-6 col-lg-9'
    };
  },

  selectedEventsView: function() {
    var events;

    var date = this.props.date;
    var month = this.props.month;
    var year = this.props.year;
    var events = this.props.events;

    // debugger;

    var title, subtitle;

    // var events = model.getEvents({
    //   calendar: this.props.calendar,
    //   date: this.props.date,
    //   month: this.props.month,
    //   year: this.props.year
    // });

    if (date) {
      title = 'Day Events';
      subtitle = date;
    }
    else if (month) {
      title = 'Month Events';
      subtitle = month;
    }
    else if (year) {
      title = 'Year Events';
      subtitle = year;
    }
    else {
      title = 'Year Events';
      subtitle = calendar;
    }

    // if (date) {
    //   title = 'Day Events';
    //   subtitle = date.format('MMMM DD, YYYY');
    // }
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
      <app.EventsView events={events} title={title} subtitle={subtitle} router={this.props.router} />
    );
  },

  render: function() {
    return (
      <div className={this.props.className}>
        {this.selectedEventsView()}
      </div>
    );
  }
});