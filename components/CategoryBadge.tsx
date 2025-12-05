import { toTitleCase } from '@/lib/helpers';
import { Badge } from './ui/badge';

interface CategoryBadgeProps {
  text: string;
}
export default function CategoryBadge({ text }: CategoryBadgeProps) {
  return (
    <Badge variant='secondary' className='bg-slate-200 font-light '>
      {toTitleCase(text)}
    </Badge>
  );
}
