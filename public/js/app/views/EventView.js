// EventView.js
// --------
define(['reactbackbone', 'showdown'],
  function(React, Showdown) {

    var EventView = React.createBackboneClass({
      getDefaultProps: function() {
        return {
          containerClassName: 'container event-view',
          contentClassName: 'event-view-content',
          converter: new Showdown.converter(),
          dangerouslySetInnerHTML: false,
          descriptionClassName: 'event-view-description',
          durationClassName: 'duration',
          headerDurationText: 'Duration: ',
          headerLocationText: 'Location: ',
          headerStartsText: 'Starts: ',
          locationClassName: 'location',
          startsClassName: 'starts',
          title: 'Show Calendar',
          titleClassName: 'event-view-title',
          toCalendarClassName: 'event-view-to-calendar',

          toCalendar: function() {}
        };
      },

      content: function() {
        var model = this.getModel();

        var content = model.get('content');

        if (this.props.dangerouslySetInnerHTML) {
          var rawMarkup = this.props.converter.makeHtml(content);

          return React.DOM.span({dangerouslySetInnerHTML: {__html: rawMarkup}});
        }
        else {
          return React.DOM.span(null, content);
        }
      },

      render: function() {
        var model = this.getModel();

        var props = this.props;

        return (
          React.DOM.div({className: props.containerClassName},
            React.DOM.div({className: props.toCalendarClassName, onClick: this.props.toCalendar},
              props.title
            ),

            React.DOM.div({className: props.contentClassName},
              React.DOM.h3({className: props.titleClassName},
                model.get('title')
              ),

              React.DOM.div({className: props.startsClassName},
                props.headerStartsText, model.starts()),
              React.DOM.div({className: props.durationClassName},
                props.headerDurationText, model.duration()),
              React.DOM.div({className: props.locationClassName},
                props.headerLocationText, model.get('location')),

              React.DOM.div({className: props.descriptionClassName},
                this.content()
              )
            )
          )
        );
      }
    });

    return EventView;
  }
);