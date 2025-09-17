# Frontend Folder Structure Design

## Frontend Folder Structure

frontend/
├── src/
│   ├── app/                        # App Router page routing
│   │   ├── page.tsx                # Home page
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles
│   │   ├── customers/              # Customer management pages
│   │   │   ├── page.tsx            # Customer list page
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx        # Customer details page
│   │   │   ├── create/
│   │   │   │   └── page.tsx        # Customer creation page
│   │   │   └── [id]/edit/
│   │   │       └── page.tsx        # Customer edit page
│   │   └── proposals/              # Proposal management pages
│   │       ├── page.tsx            # Proposal list page
│   │       ├── [id]/
│   │       │   └── page.tsx        # Proposal details page
│   │       ├── create/
│   │       │   └── page.tsx        # Proposal creation page
│   │       └── [id]/edit/
│   │           └── page.tsx        # Proposal edit page
│   ├── features/                   # Feature-based components
│   │   ├── customers/              # Customer feature
│   │   │   ├── components/         # Customer-specific components
│   │   │   │   ├── CustomerCard.tsx
│   │   │   │   ├── CustomerForm.tsx
│   │   │   │   ├── CustomerList.tsx
│   │   │   │   └── CustomerDetails.tsx
│   │   │   ├── hooks/              # Customer-related hooks
│   │   │   │   ├── useCustomers.ts
│   │   │   │   ├── useCustomer.ts
│   │   │   │   └── useCustomerMutations.ts
│   │   │   └── types/              # Customer-related types
│   │   │       └── customer.ts
│   │   └── proposals/              # Proposal feature
│   │       ├── components/         # Proposal-specific components
│   │       │   ├── ProposalCard.tsx
│   │       │   ├── ProposalForm.tsx
│   │       │   ├── ProposalList.tsx
│   │       │   ├── ProposalDetails.tsx
│   │       │   └── AIProposalGenerator.tsx
│   │       ├── hooks/              # Proposal-related hooks
│   │       │   ├── useProposals.ts
│   │       │   ├── useProposal.ts
│   │       │   ├── useProposalMutations.ts
│   │       │   └── useAIGeneration.ts
│   │       └── types/              # Proposal-related types
│   │           └── proposal.ts
│   ├── components/                 # Shared components
│   │   ├── ui/                     # UI components
│   │   │   ├── Button.tsx          # Button component
│   │   │   ├── Input.tsx           # Input field
│   │   │   ├── Modal.tsx           # Modal
│   │   │   ├── Card.tsx            # Card component
│   │   │   ├── Table.tsx           # Table
│   │   │   ├── Loading.tsx         # Loading component
│   │   │   └── Alert.tsx           # Alert
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx          # Header
│   │   │   ├── Sidebar.tsx         # Sidebar
│   │   │   ├── Footer.tsx          # Footer
│   │   │   └── Navigation.tsx      # Navigation
│   │   └── common/                 # Other shared components
│   │       ├── ErrorBoundary.tsx   # Error boundary
│   │       └── Providers.tsx       # Providers
│   ├── libs/                       # Libraries and utilities
│   │   ├── apollo/                 # Apollo Client configuration
│   │   │   ├── client.ts           # Apollo Client setup
│   │   │   └── queries/            # GraphQL queries and mutations
│   │   │       ├── customers.ts    # Customer-related queries
│   │   │       └── proposals.ts    # Proposal-related queries
│   │   ├── utils/                  # Utility functions
│   │   │   ├── format.ts           # Format functions
│   │   │   ├── validation.ts       # Validation
│   │   │   └── date.ts             # Date utilities
│   │   └── api/                    # API related
│   │       └── client.ts           # API client configuration
│   ├── constants/                  # Constants
│   │   ├── routes.ts               # Route constants
│   │   ├── messages.ts             # Message constants
│   │   └── config.ts               # Configuration constants
│   └── hooks/                      # Shared hooks
│       ├── useAuth.ts              # Authentication hook
│       ├── useLocalStorage.ts      # Local storage hook
│       └── useDebounce.ts          # Debounce hook
├── public/                         # Static files
│   ├── images/
│   └── icons/
├── package.json                    # npm configuration
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── .env.local                      # Environment variables
├── .gitignore                      # Git ignore file
└── README.md                       # Project documentation

## Architecture Design Principles

### App Router Structure
- File-based routing with `app/` directory
- Pages organized by feature directories
- Layout sharing with `layout.tsx`

### Features Structure
- Organized by features (customers, proposals) with components, hooks, and types
- Each feature maintains independence while being reusable
- Domain-driven structure for clear business logic

### Shared Components
- `components/ui/`: Reusable UI components
- `components/layout/`: Layout-related components
- `components/common/`: Other shared functionality

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Apollo Client (GraphQL) / React Query
- **UI Components**: Headless UI / Radix UI
- **Forms**: React Hook Form + Zod
- **Testing**: Jest + Testing Library

## Implementation Flow

1. **Foundation Setup**: Next.js, TypeScript, Tailwind CSS setup
2. **Shared UI**: Create base components in components/ui/
3. **GraphQL Setup**: Apollo Client and query definitions
4. **Features Implementation**: Implement customers, proposals features incrementally
5. **Page Creation**: Implement routing in app/ directory
6. **Integration Testing**: Functionality verification and test creation

## Recommended Additional Packages

```json
{
  "@apollo/client": "^3.8.0",
  "@headlessui/react": "^1.7.0",
  "@heroicons/react": "^2.0.0",
  "react-hook-form": "^7.46.0",
  "zod": "^1.3.0",
  "date-fns": "^2.30.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^1.14.0"
}
```