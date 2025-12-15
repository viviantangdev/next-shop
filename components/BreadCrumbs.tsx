// components/BreadCrumbs.tsx

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Crumb {
  title: string;
  href: string;
}

interface BreadCrumbsProps {
  title: string;
  /** The direct visible parent (e.g., "Men's Shirts" or product title on product page) */
  /** All ancestors above Home that should go into the ellipsis dropdown */
  ancestorsInDropdown?: Crumb[];
}

export default function BreadCrumbs({
  title,
  ancestorsInDropdown = [],
}: BreadCrumbsProps) {
  const hasAncestors = ancestorsInDropdown.length > 0;

  return (
    <Breadcrumb className='p-5'>
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>

        {/* Ellipsis Dropdown */}
        {hasAncestors && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1'>
                  <BreadcrumbEllipsis className='size-4 cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  {ancestorsInDropdown.map((crumb) => (
                    <DropdownMenuItem key={crumb.href} asChild>
                      <BreadcrumbLink
                        href={crumb.href}
                        className='cursor-pointer navlink-button'
                      >
                        {crumb.title}
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* Separator before current page */}
        <BreadcrumbSeparator />

        {/* Current Page */}
        <BreadcrumbItem>
          <BreadcrumbPage className='cursor-default'>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
