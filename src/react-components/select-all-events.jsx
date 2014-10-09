/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.SelectAllEvents = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'select-all-events',
      title: 'All Events',
      selected: false
    };
  },

  render: function() {
    var className = this.props.className;

    if (this.props.selected) {
      className += ' selected';
    }

    return (
      <div className={className} onClick={this.props.select}>
        {this.props.title}
      </div>
    );
  }
});