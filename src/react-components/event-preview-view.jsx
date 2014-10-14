/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

// todo: remove this class

app.EventPreviewView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      className: 'event-preview-view'
    };
  },

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

    var startMoment = model.startMoment();

    var title = model.get('title');

    if (!moment.isMoment(startMoment)) {
      return <app.InvalidDate />
    }

    return (
      <div className={this.props.className} onClick={this.onClick}>
        <span className='startTime'>{startMoment.format('MMMM DD, hh:mm a')}</span>
        <span> : </span>
        <span>{title}</span>
      </div>
    );
  }
});