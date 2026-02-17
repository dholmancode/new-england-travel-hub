export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white p-4">
        <h1 className="text-xl font-bold">New England Travel Hub</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2026 New England Travel Hub
      </footer>
    </div>
  );
}
