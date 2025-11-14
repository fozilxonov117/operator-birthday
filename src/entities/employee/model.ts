import type { Employee } from '../../shared/types';

// Mock employee data with birthdays spread across the year
// Note: Today is November 5, 2025 - some employees have birthdays today for testing
export const MOCK_EMPLOYEES: Employee[] = [
  // November birthdays (including today - Nov 5)
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://i.pravatar.cc/150?img=1',
    birthday: '11-14',
    department: 'Engineering',
    position: 'CTO',
    isLeader: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://c8.alamy.com/comp/J9CNC3/guy-telephone-phone-humans-human-beings-people-folk-persons-human-J9CNC3.jpg',
    birthday: '11-06',
    department: 'Product',
    position: 'Senior Product Manager',
    isLeader: false,
  },
  {
    id: '3',
    name: 'Emma Williams',
    photo: 'https://i.pravatar.cc/150?img=5',
    birthday: '11-14',
    department: 'Design',
    position: 'Lead Designer',
    isLeader: true,
  },
  {
    id: '4',
    name: 'James Brown',
    photo: 'https://i.pravatar.cc/150?img=12',
    birthday: '11-14',
    department: 'Engineering',
    position: 'Software Engineer',
    isLeader: false,
  },
  {
    id: '5',
    name: 'Shermatov Farxod',
    photo: 'operators/Sobirov-Abduxakim.png',
    birthday: '11-14',
    department: 'Product',
    position: 'Senior Product Manager',
    isLeader: false,
  },
  {
    id: '6',
    name: 'Sattarov Izzatbek',
    photo: 'operators/Sattarov-Izzatbek.jpg',
    birthday: '11-14',
    department: 'Product',
    position: 'Senior Product Manager',
    isLeader: false,
  },
  {
    id: '7',
    name: 'Ruziyeva Xusnora',
    photo: 'operators/Ruziyeva-Xusnora.png',
    birthday: '11-14',
    department: 'Product',
    position: 'Senior Product Manager',
    isLeader: false,
  },
  {
    id: '8',
    name: 'Sodiqov Fazliddin',
    photo: 'operators/Sodiqov-Fazliddin.jpg',
    birthday: '11-14',
    department: 'Product',
    position: 'Senior Product Manager',
    isLeader: false,
  },
  
  // January birthdays
  {
    id: '5',
    name: 'Olivia Davis',
    photo: 'https://i.pravatar.cc/150?img=10',
    birthday: '01-10',
    department: 'Marketing',
    position: 'CMO',
    isLeader: true,
  },
  {
    id: '6',
    name: 'William Garcia',
    photo: 'https://i.pravatar.cc/150?img=14',
    birthday: '01-25',
    department: 'Sales',
    position: 'Sales Representative',
    isLeader: false,
  },
  
  // February birthdays
  {
    id: '7',
    name: 'Sophia Martinez',
    photo: 'https://i.pravatar.cc/150?img=9',
    birthday: '02-14',
    department: 'HR',
    position: 'HR Director',
    isLeader: true,
  },
  {
    id: '8',
    name: 'Liam Rodriguez',
    photo: 'https://i.pravatar.cc/150?img=15',
    birthday: '02-28',
    department: 'Engineering',
    position: 'DevOps Engineer',
    isLeader: false,
  },
  
  // March birthdays
  {
    id: '9',
    name: 'Ava Wilson',
    photo: 'https://i.pravatar.cc/150?img=16',
    birthday: '03-08',
    department: 'Product',
    position: 'Product Manager',
    isLeader: false,
  },
  {
    id: '10',
    name: 'Noah Anderson',
    photo: 'https://i.pravatar.cc/150?img=33',
    birthday: '03-20',
    department: 'Finance',
    position: 'CFO',
    isLeader: true,
  },
  
  // April birthdays
  {
    id: '11',
    name: 'Isabella Thomas',
    photo: 'https://i.pravatar.cc/150?img=20',
    birthday: '04-05',
    department: 'Design',
    position: 'UI/UX Designer',
    isLeader: false,
  },
  {
    id: '12',
    name: 'Ethan Jackson',
    photo: 'https://i.pravatar.cc/150?img=17',
    birthday: '04-18',
    department: 'Engineering',
    position: 'Frontend Developer',
    isLeader: false,
  },
  
  // May birthdays
  {
    id: '13',
    name: 'Mia White',
    photo: 'https://i.pravatar.cc/150?img=23',
    birthday: '05-12',
    department: 'Marketing',
    position: 'Content Strategist',
    isLeader: false,
  },
  {
    id: '14',
    name: 'Lucas Harris',
    photo: 'https://i.pravatar.cc/150?img=52',
    birthday: '05-30',
    department: 'Sales',
    position: 'VP of Sales',
    isLeader: true,
  },
  
  // June birthdays
  {
    id: '15',
    name: 'Charlotte Martin',
    photo: 'https://i.pravatar.cc/150?img=24',
    birthday: '06-07',
    department: 'Engineering',
    position: 'Backend Developer',
    isLeader: false,
  },
  {
    id: '16',
    name: 'Benjamin Lee',
    photo: 'https://i.pravatar.cc/150?img=59',
    birthday: '06-21',
    department: 'Product',
    position: 'Product Owner',
    isLeader: false,
  },
  
  // July birthdays
  {
    id: '17',
    name: 'Amelia Walker',
    photo: 'https://i.pravatar.cc/150?img=25',
    birthday: '07-04',
    department: 'Operations',
    position: 'COO',
    isLeader: true,
  },
  {
    id: '18',
    name: 'Henry Hall',
    photo: 'https://i.pravatar.cc/150?img=68',
    birthday: '07-19',
    department: 'Engineering',
    position: 'QA Engineer',
    isLeader: false,
  },
  
  // August birthdays
  {
    id: '19',
    name: 'Harper Allen',
    photo: 'https://i.pravatar.cc/150?img=26',
    birthday: '08-11',
    department: 'Design',
    position: 'Graphic Designer',
    isLeader: false,
  },
  {
    id: '20',
    name: 'Alexander Young',
    photo: 'https://i.pravatar.cc/150?img=51',
    birthday: '08-26',
    department: 'Engineering',
    position: 'Engineering Manager',
    isLeader: true,
  },
  
  // September birthdays
  {
    id: '21',
    name: 'Evelyn King',
    photo: 'https://i.pravatar.cc/150?img=27',
    birthday: '09-03',
    department: 'Marketing',
    position: 'Social Media Manager',
    isLeader: false,
  },
  {
    id: '22',
    name: 'Sebastian Wright',
    photo: 'https://i.pravatar.cc/150?img=54',
    birthday: '09-17',
    department: 'Sales',
    position: 'Account Executive',
    isLeader: false,
  },
  
  // October birthdays
  {
    id: '23',
    name: 'Abigail Lopez',
    photo: 'https://i.pravatar.cc/150?img=28',
    birthday: '10-09',
    department: 'HR',
    position: 'Recruiter',
    isLeader: false,
  },
  {
    id: '24',
    name: 'Daniel Hill',
    photo: 'https://i.pravatar.cc/150?img=56',
    birthday: '10-31',
    department: 'Engineering',
    position: 'Data Scientist',
    isLeader: false,
  },
  
  // December birthdays
  {
    id: '25',
    name: 'Emily Scott',
    photo: 'https://i.pravatar.cc/150?img=29',
    birthday: '12-05',
    department: 'Finance',
    position: 'Financial Analyst',
    isLeader: false,
  },
  {
    id: '26',
    name: 'Matthew Green',
    photo: 'https://i.pravatar.cc/150?img=57',
    birthday: '12-25',
    department: 'Product',
    position: 'CEO',
    isLeader: true,
  },
];
