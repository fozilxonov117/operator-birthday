export interface Employee {
  id: string;
  name: string;
  photo: string;
  birthday: string; // MM-DD format
  department: string;
  position: string;
  isLeader: boolean;
}

export interface MonthData {
  id: number;
  name: string;
  shortName: string;
}
