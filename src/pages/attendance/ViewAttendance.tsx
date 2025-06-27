// CandidateCalendar.tsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";
import Layout from '../common/Layout';
import { Download } from "lucide-react";

const candidate = {
  id: "cand_001",
  name: "Dhanesh Pk",
};

const attendanceData = [
  { date: "2025-06-01", status: "H" },
  { date: "2025-06-02", status: "P" },
  { date: "2025-06-03", status: "P" },
  { date: "2025-06-04", status: "A" },
  { date: "2025-06-05", status: "P" },
  { date: "2025-06-06", status: "P" },
  { date: "2025-06-07", status: "A" },
  { date: "2025-06-08", status: "H" },
];

const statusMap = attendanceData.reduce((acc, item) => {
  acc[item.date] = item.status;
  return acc;
}, {} as Record<string, string>);

const getColor = (status: string) => {
  switch (status) {
    case "P": return "bg-green-200 text-green-900";
    case "A": return "bg-red-200 text-red-900";
    case "H": return "bg-yellow-200 text-yellow-900";
    default: return "";
  }
};

const ViewAttendance = () => {
  const [value, setValue] = useState(new Date());

  const calculateMonthlyStats = () => {
    const currentMonth = dayjs(value).format('YYYY-MM');
    const monthlyData = attendanceData.filter(record => record.date.startsWith(currentMonth));
    const present = monthlyData.filter(record => record.status === 'P').length;
    const absent = monthlyData.filter(record => record.status === 'A').length;
    const holiday = monthlyData.filter(record => record.status === 'H').length;
    const total = monthlyData.length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    return { present, absent, holiday, total, percentage };
  };

  const calculateYearlyStats = () => {
    const currentYear = dayjs(value).format('YYYY');
    const yearlyData = attendanceData.filter(record => record.date.startsWith(currentYear));
    const present = yearlyData.filter(record => record.status === 'P').length;
    const absent = yearlyData.filter(record => record.status === 'A').length;
    const holiday = yearlyData.filter(record => record.status === 'H').length;
    const total = yearlyData.length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    return { present, absent, holiday, total, percentage };
  };

  const monthlyStats = calculateMonthlyStats();
  const yearlyStats = calculateYearlyStats();

  return (
    <Layout>
      <div className="w-full px-3 py-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-semibold text-gray-800">{candidate.name}</h1>
            <span className="text-xs text-gray-500">#{candidate.id}</span>
          </div>
          <button className="flex items-center px-2 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
            <Download className="h-3 w-3 mr-1" />
            Export
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Monthly Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-medium text-gray-600">Monthly</h2>
              <span className="text-xs text-gray-500">{dayjs(value).format('MMM YY')}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-green-50 rounded p-1.5">
                <p className="text-[10px] text-green-600">Present</p>
                <p className="text-sm font-semibold text-green-700">{monthlyStats.present}</p>
              </div>
              <div className="bg-red-50 rounded p-1.5">
                <p className="text-[10px] text-red-600">Absent</p>
                <p className="text-sm font-semibold text-red-700">{monthlyStats.absent}</p>
              </div>
              <div className="bg-yellow-50 rounded p-1.5">
                <p className="text-[10px] text-yellow-600">Holiday</p>
                <p className="text-sm font-semibold text-yellow-700">{monthlyStats.holiday}</p>
              </div>
              <div className="bg-blue-50 rounded p-1.5">
                <p className="text-[10px] text-blue-600">Rate</p>
                <p className="text-sm font-semibold text-blue-700">{monthlyStats.percentage}%</p>
              </div>
            </div>
          </div>

          {/* Yearly Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-medium text-gray-600">Yearly</h2>
              <span className="text-xs text-gray-500">{dayjs(value).format('YYYY')}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-green-50 rounded p-1.5">
                <p className="text-[10px] text-green-600">Present</p>
                <p className="text-sm font-semibold text-green-700">{yearlyStats.present}</p>
              </div>
              <div className="bg-red-50 rounded p-1.5">
                <p className="text-[10px] text-red-600">Absent</p>
                <p className="text-sm font-semibold text-red-700">{yearlyStats.absent}</p>
              </div>
              <div className="bg-yellow-50 rounded p-1.5">
                <p className="text-[10px] text-yellow-600">Holiday</p>
                <p className="text-sm font-semibold text-yellow-700">{yearlyStats.holiday}</p>
              </div>
              <div className="bg-blue-50 rounded p-1.5">
                <p className="text-[10px] text-blue-600">Rate</p>
                <p className="text-sm font-semibold text-blue-700">{yearlyStats.percentage}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 mb-2">
          <style>
            {`
              .react-calendar {
                width: 100%;
                border: none;
                font-size: 0.875rem;
              }
              .react-calendar__tile {
                padding: 0.5em 0.25em;
                font-size: 0.875rem;
              }
              .react-calendar__navigation {
                margin-bottom: 0.5em;
              }
              .react-calendar__navigation button {
                min-width: 24px;
                font-size: 0.875rem;
              }
              .react-calendar__month-view__weekdays {
                font-size: 0.75rem;
                font-weight: 500;
                text-transform: uppercase;
              }
              .react-calendar__tile--now {
                background: #f3f4f6;
              }
              .react-calendar__tile--active {
                background: #3b82f6 !important;
                color: white;
              }
            `}
          </style>
          <Calendar
            onChange={(value) => setValue(value as Date)}
            value={value}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const formatted = dayjs(date).format("YYYY-MM-DD");
                const status = statusMap[formatted];
                return status ? (
                  <div className={`mt-0.5 text-[9px] font-medium ${getColor(status)} rounded px-0.5`}>
                    {status}
                  </div>
                ) : null;
              }
              return null;
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-3">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-200 rounded-full mr-1"></span>
            <span className="text-[10px] text-gray-600">Present</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-200 rounded-full mr-1"></span>
            <span className="text-[10px] text-gray-600">Absent</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-yellow-200 rounded-full mr-1"></span>
            <span className="text-[10px] text-gray-600">Holiday</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAttendance;
