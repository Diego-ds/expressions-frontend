import { ReactNode, useState } from 'react';

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <nav className="flex flex-wrap items-center justify-between bg-slate-900 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white hover:text-teal-300">
        <span className="font-serif text-xl font-semibold tracking-tight">
          Search Engine
        </span>
      </div>
      <div className="block md:hidden">
        <button
          className="flex items-center rounded border border-white px-3 py-2 text-white"
          type="button"
          onClick={() => setCollapse(!collapse)}
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={
          'w-full flex-grow md:flex md:w-auto md:items-center' +
          (collapse ? ' block' : ' hidden')
        }
      >
        <ul className="flex list-none flex-col md:ml-auto md:flex-row">
        <button className="mt-4 mr-4 block font-semibold text-white hover:text-teal-200 md:mt-0 md:inline-block">Use Guide</button>
        </ul>
      </div>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  label: string;
  children?: ReactNode;
}

const Item = ({ href, label }: NavItemProps) => {
  return (
    <li>
      <a
        className="mt-4 mr-4 block font-semibold text-white hover:text-teal-200 md:mt-0 md:inline-block"
        href={href}
      >
        {label}
      </a>
    </li>
  );
};

export default Navbar;
