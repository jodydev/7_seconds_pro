import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {

  return (
    <section>
      <Sidebar />

      <main
        className="lg:pl-72 py-10"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </section>
  );
}
