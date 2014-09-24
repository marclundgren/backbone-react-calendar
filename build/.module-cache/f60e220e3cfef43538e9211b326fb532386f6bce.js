/**
 * @jsx React.DOM
 */

// todo: split this out

// todo: fix this.props.attributes

// option tag
app.CalendarSourceOption = React.createClass({displayName: 'CalendarSourceOption',
  getInitialState: function() {
    return {
      selected: true
    }
  },

  render: function() {
    var className = 'calendar-source';

    if (this.state.selected) {
      className += ' selected';
    }

    return (
      React.DOM.option({selected: this.state.selected, value: this.props.name}, this.props.name)
    );
  }
});

// anchor tag
app.CalendarSource = React.createClass({displayName: 'CalendarSource',
  getInitialState: function() {
    return {
      selected: true
    }
  },

  onClick: function() {
    console.log('toggle: ', this.props.attributes.name);
    var toggleSelected = !this.state.selected;

    debugger;

    this.setState({selected: toggleSelected}); // re-render
  },

  render: function() {
    var className = 'calendar-source';

    if (this.state.selected) {
      className += ' selected';
    }

    return (
      React.DOM.a({href: "#", className: className, onClick: this.onClick}, 
        this.props.attributes.name
      )
    );
  }
});

app.CalendarSources = React.createClass({displayName: 'CalendarSources',
  onClick: function() {
    console.log('this will work');
  },

  onChange: function(e) {
    var vals = $(e.currentTarget).val();

    var filteredEvents = vals.map(function(item) {
      return this.props.eventscollection.where({name: item.name})
    });

    // filteredEvents
    console.log('filteredEvents: ', filteredEvents);
  },

  createOption: function(item) {
    // <option value=""></option>
    return app.CalendarSourceOption({
      name: item.get('name')
    });
  },

  createEntry: function(item) {
    item.eventscollection = this.props.eventscollection;

    console.log('item: ', item);
    return app.CalendarSource(item);
  },

  render: function() {
    // var names = this.props.sources.map(function(item) {
    //   return item.get('names');
    // });

    var names = this.props.sources.pluck('name');

    // debugger;

    console.log('names: ', names);

    return (
      React.DOM.div({className: "calendar-source-filter"}, 
        React.DOM.select({multiple: true, name: "source-filter", id: "calendarSourceFilter", onChange: this.onChange, defaultValue: names}, 
          this.props.sources.map(this.createOption)
        )
      )
    );
  }
});