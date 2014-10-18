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
      title: 'Show Calendar',

      today: function() {}
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

      return React.DOM.span({dangerouslySetInnerHTML: {__html: rawMarkup}})
    }
    else {
      return React.DOM.span(null, content);
    }
  },

  render: function() {
    var model = this.getModel();

    var rawMarkup = this.props.converter.makeHtml(model.get('content'));

    return (
      React.DOM.div({className: "container"}, 
        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-xs-12 col-sm-12 col-sm-12", onClick: this.toCalendar, className: this.props.classNametoCalendar}, 
            this.props.title
          ), 

          React.DOM.div({className: "col-xs-12 col-sm-12 col-sm-12"}, 
            React.DOM.h3({className: this.props.classNameTitle}, 
              model.get('title')
            ), 

            React.DOM.h4(null, "Starts: ", model.starts()), 
            React.DOM.h4(null, "Duration: ", model.duration()), 
            React.DOM.h4(null, "Location: ", model.get('location')), 

            React.DOM.div({className: this.props.classNameContent}, 
              this.content()
            )
          )
        )
      )
    );
  },

  _render: function() {
    var model = this.getModel();

    return (
      React.DOM.div({className: "container"}, 
        React.DOM.div({className: "row"}, 
          React.DOM.div({className: "col-xs-12 col-sm-12 col-sm-12", onClick: this.toCalendar, className: this.props.classNametoCalendar}, 
            this.props.title
          ), 

          React.DOM.div({className: "col-xs-12 col-sm-12 col-sm-12"}, 
            React.DOM.h3({className: this.props.classNameTitle}, model.get('title')), 

            React.DOM.div({className: this.props.classNameContent}, model.get('content'))
          )
        )
      )
    );
  }
});