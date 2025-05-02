import React, { useState, useEffect } from 'react'; 
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'; 
import format from 'date-fns/format'; 
import parse from 'date-fns/parse'; 
import startOfWeek from 'date-fns/startOfWeek'; 
import getDay from 'date-fns/getDay'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import './CalendarCases.css';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const allEvents = [
  {
    title: 'Neha Singh',
    start: new Date('2025-05-11'),
    end: new Date('2025-05-11'),
    status: 'Pending',
  },
  {
    title: 'Aakash Sharma',
    start: new Date('2025-05-12'),
    end: new Date('2025-05-12'),
    status: 'Pending',
  },
  {
    title: 'Ujjwal Chauhan',
    start: new Date('2025-05-15'),
    end: new Date('2025-05-15'),
    status: 'Pending',
  },
  {
    title: 'Neha Singh Disposed',
    start: new Date('2025-05-16'),
    end: new Date('2025-05-16'),
    status: 'Disposed',
  },
  {
    title: 'Vanshika',
    start: new Date('2025-05-17'),
    end: new Date('2025-05-19'),
    status: 'Pending',
  },
];

function CalendarCases() {
  const [events, setEvents] = useState(allEvents);
  const [showPending, setShowPending] = useState(true);
  const [showDisposed, setShowDisposed] = useState(false);
  const [view, setView] = useState(Views.MONTH); // Set initial view to 'month'
  const [date, setDate] = useState(new Date()); // Track current date for navigation

  const filteredEvents = events.filter(
    (e) =>
      (showPending && e.status === 'Pending') ||
      (showDisposed && e.status === 'Disposed')
  );

  const eventStyleGetter = (event) => {
    let backgroundColor = event.status === 'Pending' ? '#ffa500' : '#4caf50';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        padding: '4px',
      },
    };
  };

  // Handle navigation manually
  const handleNavigate = (date, view) => {
    console.log(date, view); // Logging the new date and view
    setView(view); // Update the view state
    setDate(date); // Set the new date when navigating
  };

  // Update the view when the user clicks on 'today', 'next', 'prev'
  const handleViewChange = (newView) => {
    setView(newView); // Update the current view state
  };

  useEffect(() => {
    // This effect will force re-render on date or view change
    console.log(`Updated View: ${view}, Date: ${date}`);
  }, [view, date]); // Depend on both view and date to trigger updates

  return (
    <div className="calendar-container">
      {/* <h2>Cases Calendar</h2> */}
      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={showPending}
            onChange={() => setShowPending(!showPending)}
          />
          Pending Cases
        </label>
        <label>
          <input
            type="checkbox"
            checked={showDisposed}
            onChange={() => setShowDisposed(!showDisposed)}
          />
          Disposed Cases
        </label>
      </div>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        view={view} // Pass the current view state here
        onView={handleViewChange} // Handle the view change when user switches between month/week/day
        defaultView={Views.MONTH}
        views={['month', 'week', 'day']}
        date={date} // Pass the current date state here to ensure the calendar updates
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        onNavigate={handleNavigate} // Manually handle navigation events (e.g. next/prev/today)
      />
    </div>
  );
}

export default CalendarCases;
