import React, { useState } from 'react';
import { User, Calendar, MessageSquare, Upload, ChevronDown, CheckCircle } from 'lucide-react';

// --- MOCK DATA ---
// In a real app, this would come from the parent's profile
const parentData = {
  children: [
    { id: 'STU-1024', name: 'Aarav Sharma' },
    { id: 'STU-1028', name: 'Priya Sharma' },
  ]
};

// --- Main Component ---
export default function LeaveApplicationForm() {
  const [selectedChild, setSelectedChild] = useState(parentData.children[0].id);
  const [leaveType, setLeaveType] = useState('Full Day');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('Sick Leave');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    console.log({
      childId: selectedChild,
      leaveType,
      fromDate,
      toDate: leaveType === 'Full Day' ? toDate : fromDate,
      reason,
      details,
      fileName: file?.name,
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Application Submitted</h1>
        <p className="text-gray-600 mt-2">
          Your leave request for {parentData.children.find(c => c.id === selectedChild)?.name} has been sent for approval.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Leave Application</h1>
          <p className="text-sm text-gray-500">Submit an absence request for your child.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500">
                {parentData.children.map(child => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Leave Type */}
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
             <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setLeaveType('Full Day')} className={`p-3 rounded-lg border text-center font-semibold ${leaveType === 'Full Day' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100'}`}>Full Day</button>
                <button type="button" onClick={() => setLeaveType('Half Day')} className={`p-3 rounded-lg border text-center font-semibold ${leaveType === 'Half Day' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100'}`}>Half Day</button>
             </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="from-date" className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input id="from-date" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            {leaveType === 'Full Day' && (
              <div>
                <label htmlFor="to-date" className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input id="to-date" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} min={fromDate} required={leaveType === 'Full Day'} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            )}
          </div>
          
          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leave</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500">
                <option>Sick Leave</option>
                <option>Family Function</option>
                <option>Medical Appointment</option>
                <option>Other</option>
              </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {/* Details Textarea */}
          {reason === 'Other' && (
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Please provide more details</label>
                <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
              </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attach Document (Optional)</label>
            <label htmlFor="file-upload" className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">{file ? file.name : 'Upload a file (e.g., doctor\'s note)'}</span>
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg text-base font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50" disabled={!fromDate}>
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
