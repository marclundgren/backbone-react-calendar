/**
 * @jsx React.DOM
 */

var app = app || {};

app.EventView = React.createBackboneClass({
  calendar: function() {
    this.props.router.navigate('', {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    if (!model) {
      debugger;
    }

    return (
      <div>
        <div onClick={this.calendar} className="back">&lt; back</div>
        <h3>{model.get('title')}</h3>
        <div>{model.get('description')}</div>
      </div>
    );
  }
});