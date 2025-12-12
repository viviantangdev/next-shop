export default function Footer() {
  return (
    <footer className='bg-amber-500 mx-auto p-4'>
      <h2>NextShop</h2>
      <span className='text-xs'>
        Copyrigth &copy; {new Date().getFullYear()} Vivian Tang. All rigths
        reserved
      </span>
    </footer>
  );
}
