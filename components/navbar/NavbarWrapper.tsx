import { getCategories } from '@/lib/api';
import Navbar from './Navbar';

export default async function NavbarWrapper() {
  const categories = await getCategories();

  return <Navbar categories={categories} />;
}
