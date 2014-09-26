/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridHeaderCell = React.createClass({
  render: function() {
    return (
      <div className='grid-cell'>
        <div>
          <div>
            <span>{this.props.name}</span>
          </div>
        </div>
      </div>
    );
  }
});