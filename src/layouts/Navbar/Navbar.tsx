import { ReactNode, useState } from 'react';

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex flex-wrap items-center justify-between bg-gray-900 p-6">
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
          <button
            className="mt-4 mr-4 block font-semibold text-white hover:text-teal-200 md:mt-0 md:inline-block"
            onClick={() => setIsOpen(true)}
          >
            Use Guide
          </button>
        </ul>
      </div>
      {isOpen && (
        <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-slate-200">
          <div className="flex justify-between border-b-2 border-slate-300">
            <h2 className="m-3 font-bold">User Guide</h2>
            <button className="m-3 px-3" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className='p-3'>
            <div>
              <p>
                Tip: You can use ‘!’ symbol to look up for columns in the
                database more easily.
              </p>
              <p>
                Tip: You can use parentheses and logical connectors (and, or) to
                group expressions in a rule, example: "quantity &lt; price or
                (price &gt; 25 and (perishable = true and natural = false))"
              </p>
            </div>
            <div>
              <p className='font-bold'>Numerical operations:</p>
              <ul>
                <li>
                  ‘&lt;’ less than (Ex. “quantity &lt; 5”, “quantity &lt;
                  price”)
                </li>
                <li>‘&gt;’ greater than (Ex. “quantity &gt; 10”)</li>
                <li>‘=’ equals (Ex. “quantity = price”)</li>
              </ul>
            </div>
            <div>
              <p className='font-bold'>Boolean operations:</p>
              <ul>
                <li>‘=’ equals (Ex. “isDone = false”)</li>
                <li>‘!=’ different (“isDone != true”, “isBlue != isCircle”)</li>
              </ul>
            </div>
            <div>
              <p className='font-bold'>Text operations:</p>
              <p>
                To enter a literal word you should use simple quotes (‘’) to
                wrap it, not double quotes (“”).
              </p>
              <ul>
                <li>‘=’ equals (Ex. “item = ‘abc’”,”type = kind”)</li>
                <li>‘!=’ different (Ex. “item != ‘xyz’”, “type != kind”)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
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
