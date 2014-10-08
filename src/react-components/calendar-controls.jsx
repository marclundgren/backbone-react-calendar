/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarControls = React.createClass({
  getDefaultProps: function() {
    return {
      date: moment()
    };
  },

  next: function() {
    var date = this.props.date.clone();

    this.props.onNext(date.startOf('month').add(1, 'month'));
    // this.props.onNext(date.startOf('month').add(1, 'month').format('YYYY-MM'));
  },

  prev: function() {
    var date = this.props.date.clone();

    this.props.onPrev(date.startOf('month').subtract(1, 'month'));
    // this.props.onPrev(date.startOf('month').subtract(1, 'month').format('YYYY-MM'));
  },

  render: function() {
    return (
      <nav className='calendar-controls'>
        <div className='arrow arrow-previous' onClick={this.prev}></div>
        <h3 className='title'>{this.props.date.format('MMMM YYYY')}</h3>
        <div className='arrow arrow-next' onClick={this.next}></div>
      </nav>
    );
  }
});