import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {

  return (
    <section>
      <Sidebar />

      <main
        className="py-5 lg:pl-72"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </section>
  );
}
