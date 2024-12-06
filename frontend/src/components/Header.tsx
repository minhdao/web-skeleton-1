import { UserInfo } from './UserInfo';

export function Header() {
  return (
    <header className="bg-teal-700 text-white sticky top-0 z-10">
      <section className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-medium">
          <a href="#">Hello, this is header</a>
        </h1>
        <UserInfo></UserInfo>
      </section>
    </header>
  );
}
