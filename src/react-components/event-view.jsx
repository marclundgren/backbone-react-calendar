/**
 * @jsx React.DOM
 */

var app = app || {};

app.EventView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      classNametoCalendar: 'event-view-to-calendar',
      classNameContent: 'event-view-content',
      classNameTitle: 'event-view-title',
      title: 'Show Calendar'
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
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-sm-12" onClick={this.toCalendar} className={this.props.classNametoCalendar}>
            {this.props.title}
          </div>

          <div className="col-xs-12 col-sm-12 col-sm-12">
            <h3 className={this.props.classNameTitle}>{model.get('title')}</h3>

            <div className={this.props.classNameContent}>{model.get('content')}</div>
          </div>
        </div>
      </div>
    );
  }
});