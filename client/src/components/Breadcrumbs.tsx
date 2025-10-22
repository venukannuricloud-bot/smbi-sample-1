import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Home className="h-4 w-4" />
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <button
              onClick={() => console.log(`Navigate to ${item.href}`)}
              className="hover:text-foreground transition-colors"
              data-testid={`breadcrumb-${item.label.toLowerCase().replace(' ', '-')}`}
            >
              {item.label}
            </button>
          ) : (
            <span className="text-foreground font-medium" data-testid={`breadcrumb-${item.label.toLowerCase().replace(' ', '-')}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
