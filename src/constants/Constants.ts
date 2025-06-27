import { User } from "../types";

// Mock users for demonstration
export const mockUsers: User[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'admin@school.edu',
      role: 'admin',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      password: 'password123'
    },
    {
      id: '2',
      name: 'Mr. David Wilson',
      email: 'teacher@school.edu',
      role: 'teacher',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      password: 'password123'
    },
    {
      id: '3',
      name: 'Mrs. Emily Brown',
      email: 'parent@school.edu',
      role: 'parent',
      phone: '+1-555-0123',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      password: 'password123'
    },
    {
      id: '4',
      name: 'Alex Johnson',
      email: 'student@school.edu',
      role: 'student',
      class: '10',
      section: 'A',
      parentId: '3',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
      password: 'password123'
    }
  ];