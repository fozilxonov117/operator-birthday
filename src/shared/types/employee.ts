export interface Employee {
  id: string;
  name: string;
  photo: string; // Primary photo for list view
  photos?: string[]; // Multiple photos for carousel (optional, fallback to single photo)
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
