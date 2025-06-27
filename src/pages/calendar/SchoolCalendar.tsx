import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Calendar, dateFnsLocalizer, Event as CalendarEvent, ToolbarProps as CalendarToolbarProps, NavigateAction } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isSameDay, isWithinInterval } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Layout from '../common/Layout';

interface Event extends CalendarEvent {
  id: string;
  description: string;
  type: 'holiday' | 'exam' | 'school-event';
}

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

// Color constants for consistent usage
const COLORS = {
  exam: {
    bg: '#EF4444',
    border: '#DC2626',
    light: '#FEE2E2',
    text: '#B91C1C'
  },
  holiday: {
    bg: '#10B981',
    border: '#059669',
    light: '#D1FAE5',
    text: '#065F46'
  },
  'school-event': {
    bg: '#3B82F6',
    border: '#2563EB',
    light: '#DBEAFE',
    text: '#1E40AF'
  }
};

const SchoolCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'exams' | 'holidays'>('all');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock events data
  const events: Event[] = [
    {
      id: '1',
      title: 'Mid-term Exams',
      start: new Date(2024, 3, 15, 9, 0),
      end: new Date(2024, 3, 19, 17, 0),
      description: 'Mid-term examinations for all classes (April 15-19)',
      type: 'exam'
    },
    {
      id: '2',
      title: 'Spring Break',
      start: new Date(2024, 3, 20, 0, 0),
      end: new Date(2024, 3, 24, 23, 59),
      description: 'School closed for spring break',
      type: 'holiday'
    },
    {
      id: '3',
      title: 'Annual Sports Day',
      start: new Date(2024, 3, 25, 10, 0),
      end: new Date(2024, 3, 25, 16, 0),
      description: 'Annual sports competition and activities',
      type: 'school-event'
    }
  ];

  const getFilteredEvents = () => {
    return events.filter(event => 
      filter === 'all' || 
      (filter === 'exams' && event.type === 'exam') ||
      (filter === 'holidays' && event.type === 'holiday')
    );
  };

  const getEventsForDate = (date: Date) => {
    return getFilteredEvents().filter(event => 
      event.start && 
      (isSameDay(event.start, date) || 
       (event.end && event.start && isWithinInterval(date, { 
         start: event.start, 
         end: event.end 
       })))
    );
  };

  const eventStyleGetter = (event: Event) => {
    const colors = COLORS[event.type];
    return {
      style: {
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0',
        display: 'block',
        height: '100%'
      }
    };
  };

  const dayPropGetter = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length === 0) return {};

    // Get the most prominent event type for the day
    const eventTypes = dayEvents.map(e => e.type);
    const hasExam = eventTypes.includes('exam');
    const hasHoliday = eventTypes.includes('holiday');
    
    let colors = COLORS['school-event'];
    if (hasExam) {
      colors = COLORS.exam;
      return {
        className: 'exam-day',
        style: {
          backgroundColor: colors.light,
          borderRadius: '4px',
          border: `2px solid ${colors.border}`,
          fontWeight: 'bold',
          color: colors.text,
          height: '100%',
          width: '100%'
        }
      };
    } else if (hasHoliday) {
      colors = COLORS.holiday;
      return {
        style: {
          backgroundColor: colors.light,
          borderRadius: '4px',
          height: '100%',
          width: '100%'
        }
      };
    }

    return {
      style: {
        backgroundColor: colors.light,
        borderRadius: '4px',
        height: '100%',
        width: '100%'
      }
    };
  };

  const renderEventList = () => {
    const eventsToShow = selectedDate ? getEventsForDate(selectedDate) : getFilteredEvents();

    return (
      <div className="mt-4 space-y-3">
        {eventsToShow.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No events found</p>
        ) : (
          eventsToShow.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {event.start && format(event.start, 'MMM d, yyyy')} • {event.start && format(event.start, 'h:mm a')}
                    {event.end && event.start && !isSameDay(event.start, event.end) && 
                      ` - ${format(event.end, 'MMM d, yyyy')} • ${format(event.end, 'h:mm a')}`}
                  </p>
                </div>
                <span 
                  className={`px-2 py-1 text-xs font-medium rounded-full`}
                  style={{
                    backgroundColor: COLORS[event.type].light,
                    color: COLORS[event.type].text
                  }}
                >
                  {event.type === 'exam' ? 'Exam' :
                   event.type === 'holiday' ? 'Holiday' :
                   'School Event'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{event.description}</p>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">School Calendar</h1>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="px-4 pb-3 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {['all', 'exams', 'holidays'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType as 'all' | 'exams' | 'holidays')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === filterType
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Calendar Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-[400px]">
              <Calendar
                localizer={localizer}
                events={getFilteredEvents()}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={eventStyleGetter}
                dayPropGetter={dayPropGetter}
                views={['month']}
                defaultView="month"
                popup
                selectable
                onSelectEvent={(event) => {
                  if (event.start) {
                    setSelectedDate(event.start);
                  }
                }}
                onSelectSlot={({ start }) => {
                  setSelectedDate(start);
                }}
                components={{
                  toolbar: CustomToolbar
                }}
              />
            </div>
          </div>

          {/* Event List */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {selectedDate 
                ? `Events for ${format(selectedDate, 'MMMM d, yyyy')}`
                : 'All Events'}
            </h2>
            {renderEventList()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Custom Toolbar Component
const CustomToolbar: React.FC<CalendarToolbarProps<Event>> = (toolbar) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('PREV' as NavigateAction);
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('NEXT' as NavigateAction);
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setFullYear(now.getFullYear());
    toolbar.onNavigate('TODAY' as NavigateAction);
  };

  const label = () => {
    const date = toolbar.date;
    return format(date, 'MMMM yyyy');
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToCurrent}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Today
          </button>
          <button
            onClick={goToNext}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900 ml-4">
            {label()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SchoolCalendar; 