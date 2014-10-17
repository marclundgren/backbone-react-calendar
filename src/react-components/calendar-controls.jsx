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
  },

  prev: function() {
    var date = this.props.date.clone();

    this.props.onPrev(date.startOf('month').subtract(1, 'month'));
  },

  render: function() {
    return (
      <nav className='calendar-controls'>
        <div className='control-previous' onClick={this.prev}>
          <div className='arrow'></div>
        </div>
        <h3 className='title'>{this.props.date.format('MMMM YYYY')}</h3>
        <div className='control-next' onClick={this.next}>
          <div className='arrow'></div>
        </div>
      </nav>
    );
  }
});