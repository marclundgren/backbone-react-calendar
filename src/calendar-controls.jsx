/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarControls = React.createClass({
  next: function() {
    this.props.onNext();
  },

  prev: function() {
    this.props.onPrev();
  },

  render: function() {
    return (
      <nav className='clndr-controls'>
        <div className='arrow arrow-previous' onClick={this.prev}></div>
        <h3 className='title'>{this.props.date.format('MMMM YYYY')}</h3>
        <div className='arrow arrow-next' onClick={this.next}></div>
      </nav>
    );
  }
});