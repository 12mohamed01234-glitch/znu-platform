
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User, UserRole, Faculty, Doctor, Quiz, Complaint } from './types';
import { 
  UNIVERSITY_NAME_EN, 
  UNIVERSITY_NAME_AR, 
  MOCK_FACULTIES, 
  MOCK_NEWS, 
  UNIVERSITY_SHORT, 
  MOCK_GRADES,
  MOCK_DOCTORS,
  MOCK_QUIZZES
} from './constants';

// --- Contexts ---
interface AppContextType {
  user: User | null;
  language: 'en' | 'ar';
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  setLanguage: (lang: 'en' | 'ar') => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// --- Branding Components ---
const UniversityLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl', monochrome?: boolean, className?: string }> = ({ size = 'md', monochrome = false, className = "" }) => {
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-40 h-40'
  };

  const brandGreen = monochrome ? '#000000' : '#27ae60';
  const brandBlack = '#000000';
  
  return (
    <div className={`${dimensions[size]} ${className} relative flex items-center justify-center`}>
      <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="98" fill="white" stroke={brandBlack} strokeWidth="4" />
        <circle cx="100" cy="100" r="70" fill={brandGreen} />
        <defs>
          <path id="topTextPath" d="M 30,100 A 70,70 0 0,1 170,100" />
          <path id="bottomTextPath" d="M 30,100 A 70,70 0 0,0 170,100" />
        </defs>
        <text fill={brandBlack} fontSize="14" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">
          <textPath xlinkHref="#topTextPath" startOffset="50%" textAnchor="middle" dy="-10">
            {UNIVERSITY_NAME_EN.toUpperCase()}
          </textPath>
        </text>
        <text fill={brandBlack} fontSize="18" fontWeight="bold" fontFamily="'Noto Sans Arabic', sans-serif">
          <textPath xlinkHref="#bottomTextPath" startOffset="50%" textAnchor="middle" side="right" dy="25">
            {UNIVERSITY_NAME_AR}
          </textPath>
        </text>
        <g transform="translate(100, 100) scale(0.8) translate(-50, -50)">
          <path d="M20,80 Q30,20 60,15 Q85,10 80,40 Q75,60 65,75 Q55,90 20,80 Z" fill={brandBlack} />
          <path d="M15,70 Q10,50 25,30 Q40,15 55,20 Q40,35 35,55 Z" fill="white" opacity="0.2" />
          <circle cx="65" cy="35" r="2" fill="white" />
        </g>
        <rect x="85" y="155" width="30" height="12" rx="2" fill={brandBlack} />
        <text x="100" y="164" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">{UNIVERSITY_SHORT}</text>
      </svg>
    </div>
  );
};

// --- Sidebar Navigation (The Taskbar) ---
const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar, user, logout } = useApp();
  const location = useLocation();

  const menuItems = [
    { id: 'home', icon: '🏛️', label: 'الرئيسية', path: '/' },
    { id: 'faculties', icon: '🎓', label: 'الكليات والبرامج', path: '/faculties' },
    { id: 'library', icon: '📂', label: 'المكتبة الرقمية (Drive)', path: '/library' },
    { id: 'staff', icon: '👨‍🏫', label: 'هيئة التدريس والتقييم', path: '/staff' },
    { id: 'exams', icon: '📝', label: 'مركز الاختبارات', path: '/exams' },
    { id: 'results', icon: '📊', label: 'نتائج الطلاب', path: '/results' },
    { id: 'complaints', icon: '⚖️', label: 'مركز الشكاوى', path: '/complaints' },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={toggleSidebar}/>
      )}

      <aside className={`fixed top-0 bottom-0 z-50 transition-all duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        right-0 border-l w-72 bg-primary-900 text-white flex flex-col shadow-2xl lg:translate-x-0`}>
        
        <div className="p-8 border-b border-white/10">
          <Link to="/" className="flex items-center gap-4 group">
            <UniversityLogo size="sm" className="bg-white p-1 rounded-full" />
            <div className="flex flex-col">
              <span className="font-black text-lg leading-none">{UNIVERSITY_SHORT}</span>
              <span className="text-[9px] font-bold text-brand-green uppercase tracking-widest leading-tight">
                {UNIVERSITY_NAME_EN}
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4 px-4">البوابة التعليمية</p>
            <div className="space-y-1">
              {menuItems.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                  className={`flex items-center gap-4 p-4 rounded-xl font-bold transition-all group ${
                    location.pathname === item.path 
                    ? 'bg-brand-green text-white shadow-lg' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/20">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center font-black">
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-black truncate">{user.name}</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{user.role}</span>
                </div>
              </div>
              <button onClick={logout} className="w-full p-3 rounded-lg border border-white/10 hover:bg-red-500 hover:border-red-500 transition-all text-[10px] font-black uppercase tracking-widest">
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center justify-center gap-2 w-full p-4 bg-brand-green rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-dark transition-all">
              <span>🔑</span> دخول المنسوبين
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

// --- Navbar (Header Bar) ---
const Topbar: React.FC = () => {
  const { toggleDarkMode, isDarkMode, toggleSidebar } = useApp();

  return (
    <header className="sticky top-0 z-40 h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 transition-all">
      <div className="flex items-center gap-4 lg:hidden">
        <button onClick={toggleSidebar} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-brand-green hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex justify-end items-center gap-6">
        <div className="flex flex-col text-right">
           <span className="text-primary-900 dark:text-white font-black text-sm">{UNIVERSITY_NAME_EN}</span>
           <span className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter">المنصة الرقمية الرسمية</span>
        </div>
        <button onClick={toggleDarkMode} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xl">
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </header>
  );
};

// --- Components for New Modules ---

const DigitalLibrary: React.FC = () => {
  const { user } = useApp();
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-8 rounded-[2rem] border-r-8 border-brand-green shadow-xl">
        <div>
           <h1 className="text-3xl font-black">المكتبة الرقمية (Drive)</h1>
           <p className="text-slate-500 font-bold mt-2">المخزن السحابي للمواد العلمية والمحاضرات</p>
        </div>
        {user?.role === UserRole.STUDENT && (
          <button className="bg-brand-green text-white px-8 py-3 rounded-2xl font-black text-sm uppercase shadow-lg shadow-brand-green/20 hover:scale-105 transition-all">
             رفع مادة علمية ⬆️
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_FACULTIES.map(f => (
          <div 
            key={f.id} 
            onClick={() => setSelectedFaculty(f.id)}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${selectedFaculty === f.id ? 'border-brand-green bg-brand-green/5' : 'border-slate-100 bg-white dark:bg-slate-800 hover:border-brand-green/50'}`}
          >
            <span className="text-4xl mb-4 block">{f.icon}</span>
            <h3 className="text-xl font-black">{f.nameAr}</h3>
            <p className="text-slate-400 text-xs mt-2">تحتوي على ملفات الأقسام والمواد</p>
          </div>
        ))}
      </div>

      {selectedFaculty && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-1.5 h-8 bg-brand-green rounded-full"></div>
             <h2 className="text-2xl font-black">ملفات القسم</h2>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-700">
             <table className="w-full text-right">
                <thead className="bg-slate-50 dark:bg-slate-900 p-4 border-b">
                   <tr>
                      <th className="p-4 text-xs font-black uppercase text-slate-400">اسم الملف</th>
                      <th className="p-4 text-xs font-black uppercase text-slate-400">النوع</th>
                      <th className="p-4 text-xs font-black uppercase text-slate-400">بواسطة</th>
                      <th className="p-4 text-xs font-black uppercase text-slate-400">تحميل</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                   {[1,2,3].map(i => (
                     <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="p-4 font-bold text-sm">محاضرة البرمجة رقم {i}</td>
                        <td className="p-4"><span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black">PDF</span></td>
                        <td className="p-4 text-xs font-bold text-slate-400">إدارة الكلية</td>
                        <td className="p-4">
                           <button className="text-brand-green hover:underline font-black text-xs">عرض الرابط</button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      )}
    </div>
  );
};

const StaffDirectory: React.FC = () => {
  const { user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div>
            <h1 className="text-4xl font-black">هيئة التدريس</h1>
            <p className="text-slate-500 font-bold mt-1">دليل الأكاديميين ونظام تقييم الأداء</p>
         </div>
         {user?.role === UserRole.ADMIN && (
           <button className="bg-primary-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-brand-green transition-all">
              إضافة عضو هيئة تدريس +
           </button>
         )}
      </div>

      <div className="relative max-w-xl">
        <input 
          type="text" 
          placeholder="ابحث عن دكتور بالاسم أو الكلية..." 
          className="w-full p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl outline-none border-2 border-transparent focus:border-brand-green transition-all font-bold pr-14"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_DOCTORS.map(doc => (
          <div key={doc.id} className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all group">
             <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-black text-primary-900">
                   {doc.name.charAt(0)}
                </div>
                <div>
                   <h3 className="text-xl font-black group-hover:text-brand-green transition-colors">{doc.name}</h3>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mt-1">{doc.title}</span>
                </div>
             </div>
             
             <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl mb-8 flex justify-between items-center">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-slate-400 uppercase">التقييم العام</span>
                   <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-primary-900 dark:text-white">{doc.rating}</span>
                      <span className="text-yellow-400">★</span>
                   </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{doc.totalRatings} طالب شارك</span>
             </div>

             <div className="flex gap-4">
                <button className="flex-1 py-4 bg-brand-green text-white rounded-2xl font-black text-xs uppercase shadow-lg shadow-brand-green/10 hover:bg-brand-dark transition-all">
                   تقييم الدكتور
                </button>
                <Link to="/complaints" className="px-6 py-4 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-black text-xs hover:border-red-500 hover:text-red-500 transition-all uppercase">
                   شكوى
                </Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExamPortal: React.FC = () => {
  return (
    <div className="p-8 space-y-10">
      <div className="bg-primary-900 p-12 rounded-[4rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
         <div className="relative z-10">
            <h1 className="text-4xl font-black mb-4">مركز الاختبارات الرقمي</h1>
            <p className="text-slate-300 font-bold max-w-md">يرجى متابعة المواعيد النهائية للاختبارات القصيرة والواجبات المنزلية المرسلة من أعضاء هيئة التدريس.</p>
         </div>
         <div className="text-6xl animate-pulse">📝</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-xl">
           <div className="flex items-center gap-4 mb-10">
              <span className="text-3xl">⏳</span>
              <h2 className="text-2xl font-black">اختبارات جارية</h2>
           </div>
           <div className="space-y-6">
              {MOCK_QUIZZES.map(q => (
                <div key={q.id} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-r-4 border-yellow-400">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <h3 className="font-black text-lg">{q.title}</h3>
                         <span className="text-xs font-bold text-slate-400 uppercase">{q.courseId}</span>
                      </div>
                      <span className="bg-yellow-100 text-yellow-600 px-4 py-1.5 rounded-full text-[10px] font-black">نشط</span>
                   </div>
                   <div className="flex items-center justify-between mt-6">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-slate-400">الموعد النهائي</span>
                         <span className="text-xs font-bold text-red-500">{q.deadline}</span>
                      </div>
                      <Link to={q.formUrl} target="_blank" className="bg-primary-900 text-white px-6 py-2.5 rounded-xl font-black text-[10px] hover:bg-brand-green transition-all shadow-lg">
                         بدء الاختبار →
                      </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center opacity-60">
           <div className="text-8xl mb-8">🏅</div>
           <h2 className="text-2xl font-black mb-4">نتائج الاختبارات</h2>
           <p className="text-slate-400 font-bold">سيتم ظهور النتائج هنا بمجرد اعتمادها من قبل عضو هيئة التدريس.</p>
        </div>
      </div>
    </div>
  );
};

const ComplaintsCenter: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-8 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-[4rem] shadow-2xl p-16 border border-slate-100 dark:border-slate-700">
         {!submitted ? (
           <>
            <h1 className="text-3xl font-black text-center mb-4">بوابة الشكاوى والبلاغات</h1>
            <p className="text-slate-500 font-bold text-center mb-12">نحن نهتم بتجربتك الأكاديمية. سيتم مراجعة الشكوى بسرية تامة من قبل إدارة الجامعة.</p>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 pr-2">الجهة الموجه إليها البلاغ</label>
                  <select className="w-full p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-transparent focus:border-brand-green outline-none font-bold appearance-none">
                     <option>اختيار الدكتور...</option>
                     {MOCK_DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                     <option value="other">أخرى / شؤون عامة</option>
                  </select>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 pr-2">تفاصيل البلاغ</label>
                  <textarea 
                    className="w-full p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-transparent focus:border-brand-green outline-none font-bold min-h-[200px]"
                    placeholder="اشرح المشكلة بالتفصيل..."
                  />
               </div>

               <button type="submit" className="w-full py-6 bg-red-500 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all">
                  إرسال البلاغ الآن
               </button>
            </form>
           </>
         ) : (
           <div className="text-center py-12">
              <div className="text-7xl mb-8">✅</div>
              <h2 className="text-3xl font-black mb-4">تم استلام بلاغك بنجاح</h2>
              <p className="text-slate-500 font-bold mb-10">سنقوم بمراجعة الطلب والتواصل معك عبر البريد الجامعي الرسمي في أقرب وقت.</p>
              <button onClick={() => setSubmitted(false)} className="text-brand-green font-black underline uppercase tracking-widest text-xs">إرسال بلاغ آخر</button>
           </div>
         )}
      </div>
    </div>
  );
};

// --- Pages (Home, Faculties, etc.) ---

const Home: React.FC = () => {
  return (
    <div className="p-8 space-y-12">
      <section className="relative h-[450px] rounded-[3rem] overflow-hidden group shadow-2xl">
        <img src="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="ZNU Main Building" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900 via-primary-900/40 to-transparent flex flex-col justify-end p-12">
          <div className="max-w-3xl">
            <div className="mb-6">
               <h1 className="text-5xl md:text-7xl font-black text-white leading-tight flex flex-col gap-2">
                 <span>مرحباً بكم في</span>
                 <span className="text-brand-green drop-shadow-lg">{UNIVERSITY_NAME_EN}</span>
               </h1>
            </div>
            <p className="text-slate-200 font-bold text-lg mb-8 max-w-xl">
               بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والبحثية والطلابية.
            </p>
            <Link to="/faculties" className="inline-block bg-brand-green text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-green/20 hover:bg-brand-dark transition-all transform hover:-translate-y-1 active:scale-95">
               استكشاف الكليات
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'كليات الجامعة', count: '12', icon: '🏛️' },
          { label: 'الطلاب المقيدين', count: '15K+', icon: '🎓' },
          { label: 'هيئة التدريس', count: '450', icon: '👨‍🏫' },
          { label: 'جوائز التميز', count: '85', icon: '🏆' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-6">
            <span className="text-4xl">{stat.icon}</span>
            <div>
              <div className="text-3xl font-black text-primary-900 dark:text-white">{stat.count}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="flex items-center gap-6 mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight">آخر المستجدات</h2>
          <div className="flex-1 h-[2px] bg-slate-100 dark:bg-slate-800"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_NEWS.map(news => (
            <div key={news.id} className="group bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-48 h-48 rounded-3xl overflow-hidden shrink-0">
                <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black text-brand-green uppercase mb-2 block">أخبار أكاديمية</span>
                <h3 className="text-xl font-black mb-4 leading-snug group-hover:text-brand-green transition-colors">
                  {news.titleAr}
                </h3>
                <p className="text-slate-500 text-sm font-medium line-clamp-2">
                  {news.contentAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ResultsPortal: React.FC = () => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [studentId, setStudentId] = useState('');

  if (showTranscript) {
    return (
      <div className="p-8">
         <div className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl p-12 border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-end border-b-4 border-brand-green pb-8 mb-10">
               <div className="text-right">
                  <h1 className="text-4xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">السجل الأكاديمي</h1>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">بيان رسمي إلكتروني بالدرجات والتقديرات</p>
               </div>
               <div className="text-left">
                  <div className="text-2xl font-black">كود الطالب: {studentId}</div>
                  <div className="text-brand-green font-bold text-xs uppercase tracking-widest">المستوى الثالث • الصيدلة الإكلينيكية</div>
               </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-700">
              <table className="w-full text-right">
                 <thead className="bg-slate-50 dark:bg-slate-900 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 dark:border-slate-700">
                    <tr>
                       <th className="p-6">كود المادة</th>
                       <th className="p-6">اسم المادة</th>
                       <th className="p-6 text-center">التقدير</th>
                       <th className="p-6 text-center">النقاط</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {MOCK_GRADES.map((g, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                         <td className="p-6 font-black text-slate-400">{g.courseCode}</td>
                         <td className="p-6 font-bold text-primary-900 dark:text-white">{g.courseName}</td>
                         <td className="p-6 text-center">
                            <span className="bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full font-black text-sm">{g.grade}</span>
                         </td>
                         <td className="p-6 text-center font-black">{g.points}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
            </div>
            <div className="mt-12 flex justify-between items-center p-8 bg-primary-900 text-white rounded-3xl shadow-xl">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">المعدل التراكمي (GPA)</span>
                  <span className="text-5xl font-black">3.72</span>
               </div>
               <button onClick={() => setShowTranscript(false)} className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                 تحميل النسخة الرسمية (PDF)
               </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-[80vh] flex items-center justify-center">
       <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-[4rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <header className="bg-primary-900 p-12 text-center text-white relative">
             <UniversityLogo size="lg" className="mx-auto mb-8 bg-white p-2 rounded-full shadow-2xl" />
             <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight uppercase">خدمات التسجيل الالكتروني</h1>
             <p className="text-brand-green font-black uppercase text-sm tracking-[0.2em] mt-2">{UNIVERSITY_NAME_AR}</p>
          </header>
          <div className="p-16 space-y-10">
             <div className="flex justify-end">
                <Link to="https://facebook.com/ZNU.Official" target="_blank" className="inline-flex items-center flex-row-reverse gap-3 text-[#1877f2] font-bold text-[13px] hover:underline">
                   <div className="bg-[#1877f2] w-6 h-6 rounded-md flex items-center justify-center text-white text-[14px]">f</div>
                   <span>الصفحة الرسمية لجامعة الزقازيق الأهلية</span>
                </Link>
             </div>
             <div className="border-4 border-slate-100 dark:border-slate-700 p-10 rounded-[2.5rem] relative group focus-within:border-brand-green transition-all">
                <h3 className="absolute -top-6 right-10 bg-white dark:bg-slate-800 px-6 py-2 text-xl font-black text-primary-900 dark:text-white uppercase tracking-tight">بيانات الدخول</h3>
                <form onSubmit={(e) => { e.preventDefault(); setShowTranscript(true); }} className="space-y-8 mt-4">
                   <div className="space-y-3 text-right">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2 block">كود الطالب</label>
                      <input type="text" required value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="2024105XXX" className="w-full p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-transparent focus:border-brand-green outline-none font-bold text-lg transition-all text-center" />
                   </div>
                   <div className="space-y-3 text-right">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2 block">كلمة السر</label>
                      <input type="password" required placeholder="••••••••" className="w-full p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-transparent focus:border-brand-green outline-none font-bold text-lg transition-all text-center" />
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 text-center mt-2">الرقم القومى - الرقم التعريفى - الرقم السرى</p>
                   </div>
                   <button type="submit" className="w-full py-6 bg-brand-green text-white rounded-3xl font-black text-sm uppercase tracking-[0.3em] shadow-xl shadow-brand-green/20 hover:scale-105 transition-all">تسجيل دخول</button>
                </form>
             </div>
             <div className="flex flex-col items-center space-y-4 pt-6 text-center">
                <Link to="#" className="text-xs font-black text-primary-900 dark:text-white hover:text-brand-green transition-colors uppercase tracking-widest underline underline-offset-8 decoration-2 decoration-brand-green">للحصول على الكود باستخدام الرقم القومى</Link>
                <Link to="#" className="text-xs font-bold text-slate-400 hover:text-brand-green transition-colors uppercase tracking-widest">لتسجيل الاستبيان يرجى الضغط هنا</Link>
             </div>
          </div>
       </div>
    </div>
  );
};

const FacultiesList: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tight text-primary-900 dark:text-white">الكليات والبرامج الأكاديمية</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-4">استكشف الأقسام والمناهج المتاحة في {UNIVERSITY_NAME_EN}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_FACULTIES.map(f => (
          <div key={f.id} className="group bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all relative overflow-hidden">
             <div className="absolute top-0 left-0 w-32 h-32 bg-brand-green/5 rounded-full -ml-16 -mt-16 group-hover:bg-brand-green/20 transition-all"></div>
             <div className="text-7xl mb-10 transform group-hover:scale-110 transition-transform">{f.icon}</div>
             <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">{f.nameAr}</h2>
             <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed">{f.descriptionAr}</p>
             <Link to="#" className="inline-flex items-center gap-3 bg-primary-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg">استكشاف البرامج <span>←</span></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const { login } = useApp();
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8">
      <div className="bg-white dark:bg-slate-800 p-16 rounded-[4rem] shadow-2xl w-full max-w-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center">
        <UniversityLogo size="xl" className="mb-12 shadow-2xl rounded-full" />
        <h1 className="text-4xl font-black mb-12 uppercase tracking-tighter text-primary-900 dark:text-white text-center">بوابة الهوية الموحدة</h1>
        <div className="w-full space-y-8">
          <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-transparent focus:border-brand-green font-black text-sm uppercase outline-none transition-all appearance-none text-right">
            <option value={UserRole.STUDENT}>طالب بجامعة الزقازيق الأهلية</option>
            <option value={UserRole.DOCTOR}>عضو هيئة تدريس</option>
            <option value={UserRole.ADMIN}>مدير النظام</option>
          </select>
          <button onClick={() => login(role)} className="w-full bg-brand-green text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-green/20 hover:bg-brand-dark transition-all">توثيق الهوية والدخول</button>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse justify-between items-center gap-10">
        <div className="flex items-center gap-4 flex-row-reverse">
          <UniversityLogo size="sm" />
          <div className="flex flex-col text-right">
            <span className="font-black text-primary-900 dark:text-white">{UNIVERSITY_SHORT}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">المنصة الرقمية الرسمية</span>
          </div>
        </div>
        <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] text-center">&copy; {new Date().getFullYear()} {UNIVERSITY_NAME_EN} | {UNIVERSITY_NAME_AR}. جميع الحقوق محفوظة.</div>
      </div>
    </footer>
  );
};

// --- Main App & Provider ---
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const login = (role: UserRole) => {
    setUser({ id: 'u1', name: role === UserRole.ADMIN ? 'مدير النظام' : 'زياد أحمد', email: 'user@znu.edu.eg', role });
  };
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <AppContext.Provider value={{ user, language, isDarkMode, isSidebarOpen, login, logout: () => setUser(null), setLanguage, toggleDarkMode, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-row-reverse">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300 lg:pr-72">
        <Topbar />
        <main className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen">{children}<Footer /></main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
 return (
  <div
    style={{
      padding: "40px",
      fontSize: "32px",
      background: "#f5f5f5",
      color: "#000",
    }}
  >
    ZNU Platform شغال ✅
  </div>
);


export default App;
