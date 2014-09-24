/**
 * @jsx React.DOM
 */

// todo: split this out

// todo: fix this.props.attributes

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
    console.log('onChange', e);

    console.log(e.target.val());
    console.log(e.currentTarget.val());

    var value = e.target.value.trim();
    console.log('value: ', value);
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
    return (
      React.DOM.div({className: "calendar-source-filter"}, 
        React.DOM.select({multiple: true, name: "source-filter", id: "calendarSourceFilter", onChange: this.onChange}, 
          this.props.sources.map(this.createOption)
        )
      )
    );
  }
});