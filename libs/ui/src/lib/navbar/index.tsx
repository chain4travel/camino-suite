import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="w-full p-4 bg-[#143157]">
      <ul className="flex space-x-4 text-gray-300">
        <li>
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/wallet" className="hover:text-gray-400">
            Wallet
          </Link>
        </li>
        <li>
          <Link href="/partners" className="hover:text-gray-400">
            Partners
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
