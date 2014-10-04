/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.EventPreviewView = React.createBackboneClass({
  onClick: function() {
    var model = this.getModel();

    var calendar = model.get('calendar');
    var id = model.get('id');

    var path = 'calendar/' + calendar + '/event/' + id;

    this.props.router.navigate(path, {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    // var startTime = model.get('startTime') || moment(model.get('gd$when')[0].startTime);
    var startTime = model.get('startTime');

    // var title = model.get('title') && model.get('title').$t || model.get('title');
    var title = model.get('title');

    return (
      <div onClick={this.onClick}>
        <span className="startTime">{moment(startTime).format('MMMM DD, hh:mm a')}</span>
        <span> : </span>
        <span>{title}</span>
      </div>
    );
  }
});