const Home = () => {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-slate-300 to-slate-500 rounded-3xl p-10 text-right text-white">
        <h1 className="text-4xl font-bold mb-4">
          مرحباً بكم في <br />
          <span className="text-green-400">Zagazig National University</span>
        </h1>

        <p className="mb-6 text-lg">
          بوابتكم الرقمية المتكاملة للخدمات الأكاديمية والبحثية والطلابية
        </p>

        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl">
          استكشف الكليات
        </button>
      </section>
    </div>
  );
};

export default Home;
