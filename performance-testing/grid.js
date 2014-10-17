/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.Toggle = React.createBackboneClass({
  getDefaultProps: function() {
    return {
      title: 'Toggle',
      checked: false,
      onChange: function() {}
    };
  },

  componentDidUpdate: function() {
    // console.info(moment().diff(this.m), ':ms total for Toggle to update');
    // console.info(moment().diff(window.m), ':ms total since MultiCalendar#render for Toggle#componentDidUpdate');
  },

  componentWillUpdate: function() {
    // this.m = moment();
    // console.info(moment().diff(window.m), ':ms total since MultiCalendar#render til Toggle#componentWillUpdate');
  },

  render: function() {
    return (React.DOM.div(null,
      React.DOM.h4(null, this.props.title),
      React.DOM.input({checked:this.props.checked, type: "checkbox", ref: "toggle", onChange: this.props.onChange})
    ));
  }
});

var Grid = React.createBackboneClass({
  getInitialState: function() {
    return {
      disableEvents: false
    };
  },

  next: function(date) {
    this.changeDate(date);
  },

  prev: function(date) {
    this.changeDate(date);
  },

  onGridSelect: function(cell) {
    this.changeDate(cell.props.date);
  },

  changeDate: function(date) {
    var model = this.getModel();

    model.set('date', date);

    // now i have to assume I know the parent grid cell class via jquery. this sucks

    // this.manageActiveStateViaJqueryClass(date.format('YYYYMMDD'));
  },

  manageActiveStateViaJqueryClass: function(id) {
    var calendarGridEl = jQuery().one('.calendar-grid');

    var dateEl = calendarGridEl.one('.grid-cell .date-' + id);
    // e.g. : `.grid-cell .date-20140809`

    if (dateEl) {
      var activeDayEl = calendarGridEl.one('.active-day');

      if (activeDayEl) {
        activeDayEl.removeClass('active-day');
        activeDayEl.removeClass('circle');
      }

      dateEl.addClass('active-day circle');
      console.log('adding active class to: ', dateEl);
    }
  },

  toggleEvents: function() {
    // var node = this.refs.getDOMNode();
    // console.log('node: ', node);

    console.log('disableEvents: ', !this.state.disableEvents);


    this.setState({disableEvents: !this.state.disableEvents});
    // debugger;
  },

  componentWillUpdate: function() {
    // console.info(moment().diff(window.m), ':ms total for MultiCalendar#render');
    window.m = moment();
  },

  render: function () {
    // window.m = moment();
    var model = this.getModel();

    var date = model.get('date');

    var events = this.state.disableEvents ? [] : model.getEvents();

    console.info(moment().diff(window.m), ':ms to fetch events');

    return (
      React.DOM.div(null,
        React.DOM.div({className: 'col-xs-12 col-sm-6 col-md-4 col-lg-3 calendar-grid-container'},
          app.Toggle({
            title: 'Disable Events Toggle',
            checked: this.state.disableEvents,
            onChange: this.toggleEvents}),

          app.CalendarControls({
            date: date,
            onPrev: this.prev,
            onNext: this.next}),

          app.CalendarGrid({
            active: true,
            date: date,
            events: events,
            onGridSelect: this.onGridSelect,
            ref: "calendarGrid"})
        ),

        React.DOM.div(null,
          date.format('YYYY-MM-DD')
        ),

        React.DOM.div(null,
          events.length
        )
      )
    );
  }
});

var now = moment().toDate();

var baconSource = {
  name: 'Bacon-Events',
  events: [
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Kielbasa', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'jerky', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'salami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'porchetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'andouille', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'fatback', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'doner', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'corned', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tongue', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'biltong', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'sausage', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'drumstick', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Venison', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shoulder', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'meatloaf', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'kielbasa', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turkey', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'porchetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'hamburger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'prosciutto', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Shank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tail', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tri-tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turducken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ham', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'filet', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'mignon', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'frankfurter', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Hamburger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'porchetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'brisket', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shankle', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'doner', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'meatloaf', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'filet', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'mignon', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ground', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'round', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pancetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'bresaola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Jowl', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'biltong', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'kevin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'meatball', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'drumstick', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Kevin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'andouille', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shoulder', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shankle', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'bresaola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'drumstick', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'hamburger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'spare', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Shankle', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'chop', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tenderloin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turducken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'leberkas', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribeye', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'biltong', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'rump', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Meatloaf', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'porchetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'cow', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'jowl', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'kielbasa', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turducken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pancetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribeye', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'prosciutto', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'corned', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Ball', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'rump', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'landjaeger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'strip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'steak', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'jowl', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'cow', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tri-tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 't-bone', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Chicken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turducken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pancetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'venison', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'andouille', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'prosciutto', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'kevin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Cow', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'strip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'steak', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'doner', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'frankfurter', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pig', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tongue', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Flank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'prosciutto', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ham', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'boudin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'doner', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'chop', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribeye', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'venison', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'landjaeger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'capicola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turducken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Boudin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'landjaeger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'cow', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'salami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tail', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'leberkas', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribeye', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pancetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 't-bone', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Ribeye', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'drumstick', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'bresaola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pancetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shoulder', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'swine', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'salami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'corned', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Ham', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'hock', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'spare', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'sausage', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'frankfurter', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tri-tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ground', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'round', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'filet', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'mignon', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shoulder', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'meatball', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'doner', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'porchetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'strip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'steak', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'boudin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'chicken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Shank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'sausage', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'prosciutto', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'brisket', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ham', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'corned', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'meatball', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'salami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'belly', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Chicken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'jowl', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'capicola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'boudin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'kielbasa', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Meatball', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'flank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shankle', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'filet', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'mignon', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pastrami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Tri-tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'chicken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'drumstick', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'brisket', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'landjaeger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Doner', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'filet', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'mignon', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'belly', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'venison', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turkey', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'fatback', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'andouille', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'frankfurter', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'cow', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'strip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'steak', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'corned', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tri-tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 't-bone', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'brisket', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'corned', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'spare', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tenderloin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'jerky', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'leberkas', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Tenderloin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pancetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'landjaeger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'salami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pig', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shoulder', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tail', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'hamburger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'jerky', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Sausage', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turducken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'biltong', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'bresaola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'meatball', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ham', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'hock', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'doner', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'salami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'cow', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'hamburger', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Capicola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shoulder', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'flank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tail', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'chop', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'chicken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'kevin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'doner', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'andouille', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'swine', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribeye', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'belly', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Bacon', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'rump', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'fatback', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ball', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Shoulder', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'sausage', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'biltong', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tri-tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'chuck', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'bresaola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'sirloin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shankle', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'leberkas', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Pastrami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tri-tip', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turducken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'corned', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ham', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'hock', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'porchetta', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'sausage', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'meatloaf', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'jerky', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'flank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'andouille', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Spare', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'boudin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ham', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'capicola', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'fatback', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'short', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'tenderloin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'andouille', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'turducken', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'salami', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'kevin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'Tongue', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'swine', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'sausage', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'corned', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'beef', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'biltong', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'shoulder', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'leberkas', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'flank', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'loin', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'spare', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'ribs', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'pork', startTime: now, endTime: now},
    {content: 'Bacon ipsum dolor sit amet jerky chicken ribeye tenderloin hamburger pig kevin.', title: 'chop'}
  ]
};

window.multicalendar = new Backbone.MultiCalendar({
  sources: [baconSource],
  view: Grid,
  mountPoint: 'calendarView'
});
