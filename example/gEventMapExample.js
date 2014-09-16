var Calendar = function() {};

var calendarStart = new Date();

var startingMoment = moment(calendarStart);
var startingYear = startingMoment.year();

var calendarYear = CALENDAR[startingYear]; // e.g. 2014

if (!calendarYear) {
	CALENDAR[startingYear] = {};
}

CALENDAR = {
	"2014": {
		// use moment().format('MMMM') to build monthName
		January: [
			{
				date: 1,
				day: 'Wednesday',
				events: {
					timed: []
				}
			},

			// ....

			{
				date: 31,
				day: 'Friday',
				events: {
					timed: []
				}
			}
		],

		February: [
			{
				date: 1,
				day: 'Saturday',
				events: {
					timed: []
				}
			},

			// ....

			{
				date: 28,
				day: 'Friday',
				events: {
					timed: []
				}
			}
		],

		// ...

		December: [
			{
				date: 1,
				day: 'Monday',
				events: {
					timed: []
				}
			},

			// ....

			{
				date: 31,
				day: 'Wednesday',
				events: {
					timed: []
				}
			}
		]
	}
};

var feb1 = _.first(CALENDAR.February);
feb1.day; // 'Wednesday'

var gEvent = {
	title: 'Open Xmas Presents :)',
	time: {
		start: 'Dec 25, 2014 9:00am PST',
		duration: {
			hours: 1
		}
	},
	type: 'timed'
};

// goal: map the xmas event to the day object

var xmasMoment = moment(gEvent.time.start);

var year = xmasMoment.year();

var month = xmasMoment.format('MMMM'); // December

var day = xmasMoment.day();

var events = CALENDAR[year][   month  ][day].events[gEvent.type];
//           CALENDAR[2014]['December'][25 ].events[  'timed'  ]

events.push(gEvent); // should re-render this day