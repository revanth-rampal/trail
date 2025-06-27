import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  filterType: 'all' | 'complaint' | 'achievement';
  onFilterTypeChange: (value: 'all' | 'complaint' | 'achievement') => void;
  filterStatus: 'all' | 'pending' | 'reviewed' | 'resolved';
  onFilterStatusChange: (value: 'all' | 'pending' | 'reviewed' | 'resolved') => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
  filterType,
  onFilterTypeChange,
  filterStatus,
  onFilterStatusChange,
}) => {
  return (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search feedback..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={onToggleFilters}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => onFilterTypeChange(e.target.value as 'all' | 'complaint' | 'achievement')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="complaint">Complaints</option>
                <option value="achievement">Achievements</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => onFilterStatusChange(e.target.value as 'all' | 'pending' | 'reviewed' | 'resolved')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFilterBar; 