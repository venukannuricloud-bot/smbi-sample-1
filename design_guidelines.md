# SBMI Membership Management Design Guidelines

## Design Approach
**System-Based Design**: Enterprise SaaS application following Material Design and modern dashboard patterns (Stripe, Linear, Notion-style admin panels). Focus on data clarity, efficient workflows, and professional presentation.

## Color System

### Brand Colors (HSL format for CSS variables)
- **Primary**: 217 74% 40% (#1836b2) - Main brand color, primary CTAs, active states
- **Accent**: 277 48% 60% (#a066cb) - Secondary actions, highlights, data visualization
- **Info**: 199 67% 73% (#86c7ed) - Informational badges, status indicators
- **White**: 0 0% 100% (#ffffff) - Backgrounds, text on dark

### Semantic Colors
- **Success**: 142 71% 45% - Payment confirmed, approval actions
- **Warning**: 38 92% 50% - Pending states, due soon notices
- **Error**: 0 84% 60% - Overdue payments, validation errors
- **Gray Scale**: 
  - Gray-50: 217 20% 97% (backgrounds)
  - Gray-100: 217 15% 93% (borders, disabled states)
  - Gray-600: 217 15% 45% (secondary text)
  - Gray-900: 217 20% 15% (primary text)

## Typography

**Font Family**: Inter or System UI stack (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)

**Scale**:
- **Headings**: 
  - H1: 2rem (32px), font-weight 700 - Page titles
  - H2: 1.5rem (24px), font-weight 600 - Section headers
  - H3: 1.25rem (20px), font-weight 600 - Card titles
  - H4: 1rem (16px), font-weight 600 - Table headers, labels
- **Body**: 
  - Base: 0.875rem (14px), font-weight 400 - Primary content
  - Small: 0.75rem (12px), font-weight 400 - Captions, helper text
  - Large: 1rem (16px), font-weight 400 - Dashboard metrics

## Layout System

**Spacing Primitives**: Use Tailwind units 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl (1280px)

**Grid System**:
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Data tables: Full-width with horizontal scroll on mobile
- Admin layouts: 2-column (sidebar 256px + main content)

## Component Library

### Cards
- Background: white with 1px gray-100 border
- Shadow: shadow-sm (subtle) on default, shadow-md on hover
- Border radius: rounded-md (6px)
- Padding: p-6 standard, p-4 for compact
- Header: border-b border-gray-100 with mb-4

### Buttons
**Primary**: bg-primary text-white, hover:opacity-90, px-4 py-2, rounded-md, font-medium
**Secondary**: border border-gray-300 text-gray-700, hover:bg-gray-50
**Accent**: bg-accent text-white for special actions
**Sizes**: sm (px-3 py-1.5 text-sm), md (default), lg (px-6 py-3)

### Forms
- Input fields: border border-gray-300, rounded-md, px-3 py-2, focus:ring-2 ring-primary
- Labels: text-sm font-medium text-gray-700, mb-1
- Error states: border-error with red text below
- Helper text: text-xs text-gray-600 mt-1
- Validation: Real-time with clear error messages

### DataTable
- Header: bg-gray-50, border-b-2 border-gray-200, sticky top-0
- Rows: border-b border-gray-100, hover:bg-gray-50
- Cell padding: px-4 py-3
- Actions column: Aligned right with icon buttons
- Features: Sort icons, filter dropdown, pagination (10/25/50/100), column toggle menu

### Charts (ChartCard)
- Container: Card with title, subtitle, timeframe tabs (7d/30d/12mo)
- Line charts: 2px stroke, primary color with 0.1 opacity fill
- Pie/Bar: Use primary, accent, info color rotation
- Grid: Subtle gray-200 lines
- Tooltips: White background, shadow-lg, rounded-md

### Navigation
**TopBar**: h-16, bg-white, border-b border-gray-200
- Logo: h-8 on left
- User menu: Right-aligned dropdown with avatar (32px circle), name, role badge

**SideNav**: w-64, bg-white, border-r border-gray-200
- Collapsible to w-16 (icons only) on mobile
- Menu items: px-4 py-2, rounded-md, hover:bg-gray-100, active:bg-primary-50 text-primary
- Icons: 20px from Heroicons, left-aligned with 12px gap to text
- Section dividers: border-t border-gray-200 with mt-4

**Breadcrumbs**: text-sm text-gray-600, "/" separator, last item text-gray-900 font-medium

**Footer**: bg-gray-50, border-t border-gray-200, py-6, text-sm text-gray-600

### Modals
- Overlay: bg-gray-900/50 backdrop-blur-sm
- Panel: bg-white, rounded-lg, shadow-xl, max-w-lg
- Header: border-b border-gray-200, px-6 py-4
- Body: px-6 py-4
- Footer: border-t border-gray-200, px-6 py-4, actions right-aligned

### Status Badges
- Pill-shaped: px-2.5 py-0.5, rounded-full, text-xs font-medium
- Paid: bg-success/10 text-success
- Pending: bg-warning/10 text-warning
- Overdue: bg-error/10 text-error
- Active: bg-info/10 text-info

### Toast Notifications
- Position: top-right, stack with 12px gap
- Background: white, border-l-4 (success/warning/error), shadow-lg
- Auto-dismiss: 5 seconds
- Icon + message + close button

## Screen-Specific Guidelines

### Login Screen
- Centered card: max-w-md, shadow-lg
- Logo at top, h-12
- Role indicator: Small badge below email field
- Forgot password: text-sm link, text-primary, right-aligned

### Dashboards (Member & Admin)
- **KPI Cards**: 4-column grid (mobile stacks), large metric (text-3xl font-bold), label below, trend indicator (+/- with arrow)
- **Charts**: 2-column grid for line/pie, full-width for detailed charts
- **Tables**: Recent activity limited to 5 rows with "View All" link

### Data Management Screens
- **Search bar**: Prominent at top with search icon, placeholder text
- **Filters**: Dropdown menus aligned right of search
- **Bulk actions**: Checkbox column, action bar appears when items selected
- **Empty state**: Centered icon (96px), heading, description, primary CTA

### Payment Integration
- **Modal**: Stripe/PayPal tabs, payment form fields, secure badge icon
- **History**: Amount column right-aligned, date formatted (MMM DD, YYYY)

## Accessibility (WCAG AA)
- Color contrast: Minimum 4.5:1 for text, 3:1 for UI components
- Focus indicators: 2px ring-primary offset-2 on all interactive elements
- Keyboard navigation: Tab order follows visual flow, Esc closes modals
- Screen readers: aria-labels on icons, role attributes on custom components
- Form validation: Live regions for error announcements

## Visual Refinements
- **Shadows**: Layered sparingly - cards use shadow-sm, modals shadow-xl
- **Transitions**: duration-200 for hovers, duration-300 for modals/dropdowns
- **Loading states**: Skeleton screens (animated gradient pulse) for tables, spinner for buttons
- **Micro-interactions**: Scale buttons to 0.98 on active, checkbox checkmark animation

## Style Guide Page Structure
Display all components in organized sections:
1. Colors (swatches with hex/HSL)
2. Typography (all heading levels + body)
3. Buttons (all variants + sizes + states)
4. Forms (inputs, selects, checkboxes, radios, validation states)
5. Cards (default, with header, with footer)
6. Tables (sortable headers, action rows, pagination)
7. Charts (line, pie, bar examples)
8. Badges & Pills (all status types)
9. Modals & Toasts (example triggers)
10. Navigation (TopBar, SideNav, Breadcrumbs samples)

Each component showcased with usage notes and accessibility guidelines.