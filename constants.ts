
import { Faculty, UniversityNews, UserRole, GradeRecord, Doctor, Quiz } from './types';

export const UNIVERSITY_NAME_EN = "Zagazig National University";
export const UNIVERSITY_NAME_AR = "جامعة الزقازيق الأهلية";
export const UNIVERSITY_SHORT = "ZNU";

export const MOCK_GRADES: GradeRecord[] = [
  { courseCode: 'ZNU-CS101', courseName: 'Introduction to Programming', grade: 'A+', percentage: 95, points: 4.0, semester: 'Fall 2023' },
  { courseCode: 'ZNU-MATH201', courseName: 'Engineering Mathematics', grade: 'A', percentage: 92, points: 3.7, semester: 'Fall 2023' },
  { courseCode: 'ZNU-ENG102', courseName: 'Technical Writing', grade: 'B+', percentage: 84, points: 3.3, semester: 'Fall 2023' },
  { courseCode: 'ZNU-PHY101', courseName: 'Applied Physics', grade: 'A-', percentage: 88, points: 3.5, semester: 'Fall 2023' },
];

export const MOCK_DOCTORS: Doctor[] = [
  { id: 'dr1', name: 'أ.د. أحمد محمد علي', facultyId: 'f1', title: 'أستاذ هندسة الحاسبات', rating: 4.8, totalRatings: 120 },
  { id: 'dr2', name: 'د. سارة محمود السعدني', facultyId: 'f1', title: 'مدرس علوم الحاسب', rating: 4.5, totalRatings: 85 },
  { id: 'dr3', name: 'أ.د. حنان رفعت', facultyId: 'f7', title: 'عميد كلية الصيدلة', rating: 4.9, totalRatings: 200 },
  { id: 'dr4', name: 'د. خالد عثمان', facultyId: 'f6', title: 'أستاذ جراحة الفم', rating: 4.2, totalRatings: 50 },
];

export const MOCK_QUIZZES: Quiz[] = [
  { id: 'q1', courseId: 'ZNU-CS101', doctorId: 'dr1', title: 'اختبار نصف الفصل - برمجة 1', formUrl: 'https://forms.google.com', deadline: '2024-12-30' },
  { id: 'q2', courseId: 'ZNU-MATH201', doctorId: 'dr2', title: 'كويز مادة الرياضيات الهندسية', formUrl: 'https://forms.google.com', deadline: '2024-12-25' },
];

export const MOCK_NEWS: UniversityNews[] = [
  {
    id: '1',
    titleEn: 'ZNU Ranks Top Among National Universities',
    titleAr: 'جامعة الزقازيق الأهلية تتصدر تصنيف الجامعات الأهلية',
    contentEn: 'The latest academic rankings place ZNU at the forefront of innovation and research quality in the region.',
    contentAr: 'تصنيفات أكاديمية حديثة تضع جامعة الزقازيق الأهلية في طليعة الابتكار وجودة البحث العلمي في المنطقة.',
    date: '2024-10-12',
    category: 'Academic',
    image: 'https://picsum.photos/seed/znu_news1/800/400'
  },
  {
    id: '2',
    titleEn: 'Registration Open for Fall 2024',
    titleAr: 'فتح باب التسجيل لفصل الخريف ٢٠٢٤',
    contentEn: 'Prospective students can now apply for undergraduate programs across all faculties.',
    contentAr: 'يمكن للطلاب الجدد الآن التقديم لبرامج البكالوريوس في جميع الكليات.',
    date: '2024-09-01',
    category: 'Events',
    image: 'https://picsum.photos/seed/znu_news2/800/400'
  }
];

export const MOCK_FACULTIES: Faculty[] = [
  {
    id: 'f1',
    nameEn: 'Faculty of Engineering',
    nameAr: 'كلية الهندسة',
    descriptionEn: 'Advanced engineering programs with a focus on sustainable energy and AI.',
    descriptionAr: 'برامج هندسية متقدمة مع التركيز على الطاقة المستدامة والذكاء الاصطناعي.',
    icon: '🏗️',
    dean: 'Prof. Ahmed Salem',
    departments: [
      {
        id: 'd1',
        facultyId: 'f1',
        nameEn: 'Computer Systems',
        nameAr: 'أنظمة الحاسب',
        descriptionEn: 'Specialized in hardware-software integration and networks.',
        descriptionAr: 'متخصص في تكامل البرمجيات والأجهزة والشبكات.',
        courses: []
      }
    ]
  },
  {
    id: 'f2',
    nameEn: 'Faculty of Medicine',
    nameAr: 'كلية الطب',
    descriptionEn: 'Integrating modern technology with clinical excellence.',
    descriptionAr: 'دمج التكنولوجيا الحديثة مع التميز الإكلينيكي.',
    icon: '🩺',
    dean: 'Dr. Sarah Hassan',
    departments: []
  },
  {
    id: 'f7',
    nameEn: 'Faculty of Pharmacy',
    nameAr: 'كلية الصيدلة',
    descriptionEn: 'Excellence in pharmaceutical sciences and patient-centered clinical practice.',
    descriptionAr: 'التميز في العلوم الصيدلية والممارسة الإكلينيكية التي تركز على المريض.',
    icon: '💊',
    dean: 'Prof. Hanan Refaat',
    departments: [
      {
        id: 'd7_1',
        facultyId: 'f7',
        nameEn: 'Clinical Pharmacy',
        nameAr: 'الصيدلة الإكلينيكية',
        descriptionEn: 'Advanced study of pharmaceutical care and therapeutic management.',
        descriptionAr: 'دراسة متقدمة للرعاية الصيدلية والإدارة العلاجية.',
        courses: []
      }
    ]
  },
  {
    id: 'f4',
    nameEn: 'Faculty of Commerce',
    nameAr: 'كلية التجارة',
    descriptionEn: 'Preparing leaders for the global market.',
    descriptionAr: 'إعداد قادة للسوق العالمي.',
    icon: '📊',
    dean: 'Prof. Hisham El-Sayed',
    departments: []
  },
  {
    id: 'f5',
    nameEn: 'Faculty of Nursing',
    nameAr: 'كلية التمريض',
    descriptionEn: 'Compassionate and professional healthcare education.',
    descriptionAr: 'تعليم متميز للرعاية الصحية المهنية والإنسانية.',
    icon: '👩‍⚕️',
    dean: 'Dr. Nadia Mohamed',
    departments: []
  },
  {
    id: 'f6',
    nameEn: 'Faculty of Dentistry',
    nameAr: 'كلية طب الأسنان',
    descriptionEn: 'State-of-the-art dental education and oral health research.',
    descriptionAr: 'تعليم متطور في طب الأسنان وأبحاث صحة الفم والفكين.',
    icon: '🦷',
    dean: 'Prof. Khaled Osman',
    departments: []
  }
];
