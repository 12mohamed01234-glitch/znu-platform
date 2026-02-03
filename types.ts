
export enum UserRole {
  VISITOR = 'VISITOR',
  STUDENT = 'STUDENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  facultyId?: string;
  departmentId?: string;
  avatar?: string;
}

export interface Faculty {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  dean: string;
  departments: Department[];
}

export interface Department {
  id: string;
  facultyId: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  courses: Course[];
}

export interface Course {
  id: string;
  deptId: string;
  code: string;
  nameEn: string;
  nameAr: string;
  creditHours: number;
  instructorId: string;
  materials: Material[];
}

export interface GradeRecord {
  courseCode: string;
  courseName: string;
  grade: string;
  percentage: number;
  points: number;
  semester: string;
}

export interface Material {
  id: string;
  type: 'video' | 'pdf' | 'drive';
  title: string;
  url: string;
  dateAdded: string;
  uploaderName?: string;
}

export interface Doctor {
  id: string;
  name: string;
  facultyId: string;
  title: string;
  rating: number;
  totalRatings: number;
  avatar?: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  doctorId: string;
  content: string;
  date: string;
  status: 'pending' | 'resolved';
}

export interface Quiz {
  id: string;
  courseId: string;
  doctorId: string;
  title: string;
  formUrl: string;
  deadline: string;
}

export interface UniversityNews {
  id: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  date: string;
  category: 'Academic' | 'Social' | 'Sports' | 'Events';
  image: string;
}
