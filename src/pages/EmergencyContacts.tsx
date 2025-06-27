import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  User,
  BookOpen,
  Hash,
  Heart,
  AlertCircle,
  Pill,
  Stethoscope,
  FileText,
  Search,
  X,
  GraduationCap,
  Filter
} from 'lucide-react';

interface ContactInfo {
  name: string;
  relationship: string;
  phoneNumbers: string[];
  email: string;
}

interface MedicalInfo {
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  doctorName: string;
  doctorPhone: string;
}

interface StudentInfo {
  name: string;
  class: string;
  rollNo: string;
  primaryContact: ContactInfo;
  secondaryContact: ContactInfo;
  medicalInfo: MedicalInfo;
  importantNotes: string;
}

const EmergencyContacts: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentInfo | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchType, setSearchType] = useState<'name' | 'rollNo'>('name');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    studentDetails: true,
    primaryContact: true,
    secondaryContact: true,
    medicalInfo: true,
    importantNotes: true
  });

  // Mock data - Replace with actual API call
  const mockStudents: StudentInfo[] = [
    {
      name: "John Doe",
      class: "10th Grade",
      rollNo: "1023",
      primaryContact: {
        name: "Jane Doe",
        relationship: "Mother",
        phoneNumbers: ["+1 234-567-8900", "+1 234-567-8901"],
        email: "jane.doe@email.com"
      },
      secondaryContact: {
        name: "James Doe",
        relationship: "Father",
        phoneNumbers: ["+1 234-567-8902"],
        email: "james.doe@email.com"
      },
      medicalInfo: {
        bloodGroup: "O+",
        allergies: ["Peanuts", "Shellfish"],
        chronicConditions: ["Asthma"],
        medications: ["Inhaler"],
        doctorName: "Dr. Smith",
        doctorPhone: "+1 234-567-8903"
      },
      importantNotes: "Carry inhaler at all times. Contact primary guardian first in case of emergency."
    },
    // Add more mock students here
  ];

  const classes = ["10th Grade", "9th Grade", "8th Grade", "7th Grade"]; // Replace with actual classes

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = searchType === 'name' 
      ? student.name.toLowerCase().includes(searchQuery.toLowerCase())
      : student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleStudentSelect = (student: StudentInfo) => {
    setSelectedStudent(student);
    setShowSearch(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const Card: React.FC<{
    title: string;
    icon: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }> = ({ title, icon, isExpanded, onToggle, children }) => (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden border border-gray-100">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );

  if (!selectedStudent) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 mr-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Emergency Contacts
            </h1>
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Search className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Interface */}
        {showSearch && (
          <div className="fixed inset-0 bg-white z-20">
            <div className="sticky top-0 bg-white shadow-sm p-4">
              <div className="flex items-center space-x-2 mb-4">
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold">Search Students</h2>
              </div>
              
              {/* Search Input with Type Selector */}
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search by ${searchType === 'name' ? 'name' : 'roll number'}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <X className="h-5 w-5 text-gray-400" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setSearchType(searchType === 'name' ? 'rollNo' : 'name')}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    {searchType === 'name' ? 'Name' : 'Roll No'}
                  </button>
                </div>

                {/* Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                  </div>
                  {showFilters ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {/* Filter Dropdown */}
                {showFilters && (
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Classes</option>
                        {classes.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                )}
              </div>
            </div>

            {/* Student List */}
            <div className="p-4 space-y-2">
              {filteredStudents.map((student, index) => (
                <button
                  key={index}
                  onClick={() => handleStudentSelect(student)}
                  className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.class} • Roll No: {student.rollNo}</p>
                    </div>
                  </div>
                </button>
              ))}
              {filteredStudents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No students found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] p-4">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Search for a Student</h2>
          <p className="text-gray-500 text-center mb-6">
            Search by name or roll number and filter by class to view emergency contact information
          </p>
          <button
            onClick={() => setShowSearch(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Search Students
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSelectedStudent(null)}
            className="p-2 -ml-2 mr-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Emergency Info - {selectedStudent.name}
          </h1>
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Search className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Student Details Card */}
        <Card
          title="Student Details"
          icon={<User className="h-5 w-5 text-blue-600" />}
          isExpanded={expandedSections.studentDetails}
          onToggle={() => toggleSection('studentDetails')}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{selectedStudent.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{selectedStudent.class}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Hash className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Roll No: {selectedStudent.rollNo}</span>
            </div>
          </div>
        </Card>

        {/* Primary Contact Card */}
        <Card
          title="Primary Contact"
          icon={<User className="h-5 w-5 text-green-600" />}
          isExpanded={expandedSections.primaryContact}
          onToggle={() => toggleSection('primaryContact')}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{selectedStudent.primaryContact.name}</span>
            </div>
            <div className="text-gray-600">
              Relationship: {selectedStudent.primaryContact.relationship}
            </div>
            <div className="space-y-2">
              {selectedStudent.primaryContact.phoneNumbers.map((phone, index) => (
                <button
                  key={index}
                  onClick={() => handleCall(phone)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Phone className="h-5 w-5" />
                  <span>{phone}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => handleEmail(selectedStudent.primaryContact.email)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Mail className="h-5 w-5" />
              <span>{selectedStudent.primaryContact.email}</span>
            </button>
          </div>
        </Card>

        {/* Secondary Contact Card */}
        <Card
          title="Secondary Contact"
          icon={<User className="h-5 w-5 text-orange-600" />}
          isExpanded={expandedSections.secondaryContact}
          onToggle={() => toggleSection('secondaryContact')}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{selectedStudent.secondaryContact.name}</span>
            </div>
            <div className="text-gray-600">
              Relationship: {selectedStudent.secondaryContact.relationship}
            </div>
            <div className="space-y-2">
              {selectedStudent.secondaryContact.phoneNumbers.map((phone, index) => (
                <button
                  key={index}
                  onClick={() => handleCall(phone)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Phone className="h-5 w-5" />
                  <span>{phone}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => handleEmail(selectedStudent.secondaryContact.email)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Mail className="h-5 w-5" />
              <span>{selectedStudent.secondaryContact.email}</span>
            </button>
          </div>
        </Card>

        {/* Medical Information Card */}
        <Card
          title="Medical Information"
          icon={<Heart className="h-5 w-5 text-red-600" />}
          isExpanded={expandedSections.medicalInfo}
          onToggle={() => toggleSection('medicalInfo')}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Blood Group: {selectedStudent.medicalInfo.bloodGroup}</span>
            </div>
            
            {selectedStudent.medicalInfo.allergies.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Allergies:</span>
                </div>
                <ul className="list-disc list-inside ml-7 text-gray-600">
                  {selectedStudent.medicalInfo.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedStudent.medicalInfo.chronicConditions.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Chronic Conditions:</span>
                </div>
                <ul className="list-disc list-inside ml-7 text-gray-600">
                  {selectedStudent.medicalInfo.chronicConditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedStudent.medicalInfo.medications.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Medications:</span>
                </div>
                <ul className="list-disc list-inside ml-7 text-gray-600">
                  {selectedStudent.medicalInfo.medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{selectedStudent.medicalInfo.doctorName}</span>
              </div>
              <button
                onClick={() => handleCall(selectedStudent.medicalInfo.doctorPhone)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 ml-7"
              >
                <Phone className="h-5 w-5" />
                <span>{selectedStudent.medicalInfo.doctorPhone}</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Important Notes Card */}
        <Card
          title="Important Notes"
          icon={<FileText className="h-5 w-5 text-yellow-600" />}
          isExpanded={expandedSections.importantNotes}
          onToggle={() => toggleSection('importantNotes')}
        >
          <p className="text-gray-600">{selectedStudent.importantNotes}</p>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyContacts; 