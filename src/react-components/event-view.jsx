/**
 * @jsx React.DOM
 */

var app = app || {};

app.EventView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNametoCalendar: 'event-view-to-calendar',
      classNameContent: 'event-view-content',
      classNameTitle: 'event-view-title'
    };
  },

  toCalendar: function() {
    this.props.router.navigate('', {
      trigger: true
    });
  },

  render: function() {
    var model = this.getModel();

    return (
      <div>
        <div onClick={this.toCalendar} className={this.props.classNametoCalendar}>&lt; back</div>

        <h3 className={this.props.classNameTitle}>{model.get('title')}</h3>

        <div className={this.props.classNameContent}>{model.get('content')}</div>
      </div>
    );
  }
});