// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
/* global require */

require(['models/MultiCalendar'],
  function(MultiCalendar) {

    new MultiCalendar({
      dangerouslySetInnerHTML: true,

      sources: [
        {name: 'Google-Calendar-Events', googleCalendarApiV: 3, url: 'https://content.googleapis.com/calendar/v3/calendars/uicih7p1rpl0dvrasudspuuj0g%40group.calendar.google.com/events?key=AIzaSyBe0rRmqVCVYE4DxykUgoaZK_9ptaYw7ko'},
        {name: 'Empty-List', events: []}
      ],

      title: 'Test Events Calendar',

      mountPoint: document.getElementById('calendar')
    });
  }
);