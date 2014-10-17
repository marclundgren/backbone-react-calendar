/**
 * @jsx React.DOM
 */

var app = app || {};

app.EventView = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      converter: new Showdown.converter(),
      classNametoCalendar: 'event-view-to-calendar',
      classNameContent: 'event-view-content',
      classNameTitle: 'event-view-title',
      dangerouslySetInnerHTML: false,
      title: 'Show Calendar'
    };
  },

  toCalendar: function() {
    this.props.router.navigate('', {
      trigger: true
    });
  },

  content: function() {
    var model = this.getModel();

    var content = model.get('content');

    if (this.props.dangerouslySetInnerHTML) {
      var rawMarkup = this.props.converter.makeHtml(content);

      return <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
    }
    else {
      return <span>{content}</span>;
    }
  },

  render: function() {
    var model = this.getModel();

    var rawMarkup = this.props.converter.makeHtml(model.get('content'));

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-sm-12" onClick={this.toCalendar} className={this.props.classNametoCalendar}>
            {this.props.title}
          </div>

          <div className="col-xs-12 col-sm-12 col-sm-12">
            <h3 className={this.props.classNameTitle}>
              {model.get('title')}
            </h3>

            <h4>Starts: {model.starts()}</h4>
            <h4>Duration: {model.duration()}</h4>
            <h4>Location: {model.get('location')}</h4>

            <div className={this.props.classNameContent}>
              {this.content()}
            </div>
          </div>
        </div>
      </div>
    );
  },

  _render: function() {
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