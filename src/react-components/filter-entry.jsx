/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.FilterEntry = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'filter',
      name: '',
      model: new Backbone.Model()
    };
  },

  getInitialState: function() {
    return {
      active: true
    };
  },

  toggleActive: function() {
    this.setState({active: !this.state.active});

    this.props.filter(this.props.model);
  },

  render: function() {
    var className = this.props.className;

    if (this.state.active) {
      className += ' active';
    }

    return (
      <div className={className} onClick={this.toggleActive}>{this.props.name}</div>
    );
  }
});