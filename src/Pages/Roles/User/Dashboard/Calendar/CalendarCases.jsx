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

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});


function CalendarCases() {
  const [events, setEvents] = useState([]);
  const [showPending, setShowPending] = useState(true);
  const [showDisposed, setShowDisposed] = useState(false);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Fetch data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/api/cases/calendar`, {
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();

        if (responseData.status === 'SUCCESS' && responseData.data) {
          // Convert start/end strings to Date objects
          const formattedEvents = responseData.data.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));

          setEvents(formattedEvents);
        } else {
          console.error('Failed to fetch calendar events:', responseData.message);
        }
      } catch (error) {
        console.error('Failed to fetch calendar events:', error);
      }
    };

    fetchEvents();
  }, []);

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

  const handleNavigate = (date, view) => {
    setView(view);
    setDate(date);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="calendar-container">
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
        view={view}
        onView={handleViewChange}
        defaultView={Views.MONTH}
        views={['month', 'week', 'day']}
        date={date}
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default CalendarCases;
