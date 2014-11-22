// DesktopInit.js
// --------------

/* global require */
require(['models/MultiCalendar', 'moment', 'fastclick'],
  function(MultiCalendar, moment) {

    var YYYYMMDD = moment().format('YYYY-MM-DD');

    var url = 'https://www.googleapis.com/calendar/v3/calendars/uicih7p1rpl0dvrasudspuuj0g%40group.calendar.google.com/events?timeMin=' + YYYYMMDD + 'T00:00:00.000Z&key=AIzaSyBe0rRmqVCVYE4DxykUgoaZK_9ptaYw7ko';

    var multical = new MultiCalendar({
      dangerouslySetInnerHTML: true,

      sources: [
        {name: 'Google-Calendar-Events', googleCalendarApiV: 3, url: url},
        {name: 'Empty-List', events: []}
      ],

      title: 'Test Events Calendar',

      mountPoint: document.getElementById('calendar')
    });

    FastClick.attach(multical.get('mountPoint'));
  }
);