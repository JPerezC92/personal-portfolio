---
name: clean-architecture-frontend
description: Reference blueprint for how frontend feature modules must be structured following Clean Architecture in the Next.js web app
user-invocable: true
allowed-tools: Bash, Read, Glob, Grep
---

# Frontend Architecture — Module Blueprint

This skill defines the canonical structure for all `apps/web` feature modules. Use it when creating, reviewing, or modifying any frontend feature.

## Directory Structure

```
apps/web/
├── app/                           # Next.js App Router pages (composition root)
│   ├── layout.tsx                 # Root layout (QueryProvider + Header)
│   ├── page.tsx                   # Home page
│   └── {feature}/page.tsx         # Feature page (composes module components)
├── modules/                       # Feature modules (clean architecture)
│   └── {feature}/                 # One directory per feature
├── shared/                        # Cross-cutting infrastructure
│   ├── api/
│   │   └── client.ts              # Fetch-based API client (HTTP adapter)
│   └── hooks/
│       └── use-pagination.ts      # Pagination hook
├── components/                    # Global UI components
│   ├── ui/                        # shadcn/ui primitives (Radix UI)
│   ├── header.tsx
│   ├── navigation.tsx
│   └── data-table.tsx
├── lib/                           # Utilities
│   ├── api.ts                     # Error message parsing
│   └── utils/
├── providers/                     # React Context Providers
│   └── query-provider.tsx         # TanStack React Query setup
├── test/                          # Test utilities
│   ├── setup.ts                   # Vitest global setup
│   └── utils/test-utils.tsx       # renderWithQueryClient, createTestQueryClient
└── e2e/                           # Playwright E2E tests
    ├── __tests__/                 # Test specs (smoke, seeded-data, data-mutation)
    ├── fixtures/                  # Excel/test data files
    ├── global-setup.ts
    └── global-teardown.ts
```

## Module Structure

Every feature module follows clean architecture layers. Dependencies point inward: components → hooks → services → types.

```
modules/{feature}/
├── services/                          # APPLICATION LAYER
│   └── {feature}.service.ts           #   API orchestration + Zod validation
├── hooks/                             # INFRASTRUCTURE LAYER (React-specific)
│   ├── use-{feature}.ts               #   Data fetching (useQuery)
│   ├── use-create-{feature}.ts        #   Create mutation (useMutation)
│   ├── use-update-{feature}.ts        #   Update mutation
│   ├── use-delete-{feature}.ts        #   Delete mutation
│   ├── use-upload-{feature}.ts        #   File upload mutation
│   └── use-{feature}-filters.ts       #   Filter/search logic (useState + useMemo)
├── components/                        # INFRASTRUCTURE LAYER (React UI)
│   ├── {feature}-list.tsx             #   Main list with table
│   ├── {feature}-upload.tsx           #   Upload section
│   ├── {feature}-actions.tsx          #   Action buttons (delete all, etc.)
│   ├── create-{entity}-modal.tsx      #   Create dialog
│   ├── edit-{entity}-modal.tsx        #   Edit dialog
│   └── delete-confirm-dialog.tsx      #   Delete confirmation AlertDialog
├── keys.ts                            # INFRASTRUCTURE (React Query key factory)
└── __tests__/
    ├── components/
    │   └── {feature}-list.spec.tsx     # Component tests
    ├── services/
    │   └── {feature}.service.spec.ts   # Service integration tests
    └── helpers/
        └── {feature}.factory.ts       # Test data generators (faker)
```

## Layer Rules

### Domain Layer (`@repo/reports/frontend`)

The frontend has **no local domain layer**. All types, interfaces, and Zod schemas are defined in the shared `@repo/reports` package and consumed via the `@repo/reports/frontend` entry point — which excludes NestJS-specific exports (DTOs, decorators).

```typescript
// Types come from the shared package — never defined locally
import type { RequestTag, RequestTagListResponse } from '@repo/reports/frontend';
import { requestTagListResponseSchema } from '@repo/reports/frontend';
```

> **Domain rules:**
> - **Never** define entity types locally in a module — import from `@repo/reports/frontend`
> - **Never** import from `@repo/reports` directly in frontend code — use `@repo/reports/frontend` (excludes NestJS deps)
> - JSend helpers (`parseJsendData`) come from `@repo/reports/common`

### Application Layer (`services/`)

Pure async functions. **Zero React imports.** No hooks, no `useState`, no framework code. Services orchestrate API calls + Zod validation — they are the frontend equivalent of backend use cases.

```typescript
import { apiClient } from '@/shared/api/client';
import { parseJsendData } from '@repo/reports/common';
import {
  requestTagListResponseSchema,
  requestTagUploadResultSchema,
  requestTagDeleteResultSchema,
} from '@repo/reports/frontend';
import type {
  RequestTagListResponse,
  RequestTagUploadResult,
  RequestTagDeleteResult,
} from '@repo/reports/frontend';

export const requestTagsService = {
  getAll: async (): Promise<RequestTagListResponse> => {
    const raw = await apiClient.get<unknown>('/request-tags');
    return parseJsendData(requestTagListResponseSchema, raw);
  },

  upload: async (file: File): Promise<RequestTagUploadResult> => {
    const formData = new FormData();
    formData.append('file', file);
    const raw = await apiClient.postForm<unknown>('/request-tags/upload', formData);
    return parseJsendData(requestTagUploadResultSchema, raw);
  },

  deleteAll: async (): Promise<RequestTagDeleteResult> => {
    const raw = await apiClient.delete<unknown>('/request-tags');
    return parseJsendData(requestTagDeleteResultSchema, raw);
  },
};
```

> **Service rules:**
> - **Zero React imports** — no `useState`, `useEffect`, `useQuery`, or any hook
> - Use `apiClient.get<unknown>`, `apiClient.post<unknown>`, etc. — always `<unknown>` generic
> - Unwrap with `parseJsendData(zodSchema, raw)` — validates JSend envelope + data in one step
> - Import Zod schemas and types from `@repo/reports/frontend`
> - **Never** use `JSendSuccess<T>` type casting — always use `parseJsendData` for runtime validation
> - Each method returns the unwrapped data (not the JSend envelope)
> - File uploads use `apiClient.postForm` with `FormData`

### Infrastructure Layer (`hooks/`, `components/`, `keys.ts`)

All React/framework-dependent code lives here. Hooks wrap services in React Query. Components render UI with shadcn/ui.

**Query Keys Factory** (`keys.ts`) — defines cache keys for React Query:

```typescript
// Simple module
export const requestTagsKeys = {
  all: ['request-tags'] as const,
};

// Module with sub-queries
export const applicationRegistryKeys = {
  all: ['application-registry'] as const,
  withPatterns: () => [...applicationRegistryKeys.all, 'with-patterns'] as const,
};
```

**Data Fetching Hook** — wraps service in `useQuery`:

```typescript
import { useQuery } from '@tanstack/react-query';
import { requestTagsService } from '@/modules/request-tags/services/request-tags.service';
import { requestTagsKeys } from '@/modules/request-tags/keys';

export function useRequestTags() {
  return useQuery({
    queryKey: requestTagsKeys.all,
    queryFn: requestTagsService.getAll,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('4')) return false;
      return failureCount < 3;
    },
  });
}
```

**Mutation Hook** — wraps service in `useMutation` with cache invalidation:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestTagsService } from '@/modules/request-tags/services/request-tags.service';
import { requestTagsKeys } from '@/modules/request-tags/keys';

export function useUploadRequestTags() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestTagsService.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requestTagsKeys.all });
    },
    onError: (error) => {
      console.error('Upload failed:', error);
    },
  });
}
```

**Filter Hook** — pure data transformation with React state:

```typescript
import { useMemo, useState } from 'react';
import type { RequestTag } from '@repo/reports/frontend';

export function useRequestTagsFilters(tags: RequestTag[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState<string>('all');
  const [filterCategorizacion, setFilterCategorizacion] = useState<string>('all');

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === '' ||
        tag.requestId.toLowerCase().includes(searchLower) ||
        tag.technician.toLowerCase().includes(searchLower) ||
        tag.modulo.toLowerCase().includes(searchLower);
      const matchesModule = filterModule === 'all' || tag.modulo === filterModule;
      const matchesCat = filterCategorizacion === 'all' || tag.categorizacion === filterCategorizacion;
      return matchesSearch && matchesModule && matchesCat;
    });
  }, [tags, searchTerm, filterModule, filterCategorizacion]);

  const uniqueModules = useMemo(
    () => [...new Set(tags.map((t) => t.modulo))].sort(),
    [tags]
  );

  return {
    searchTerm, setSearchTerm,
    filterModule, setFilterModule,
    filteredTags,
    uniqueModules,
  };
}
```

**Pagination Hook** (shared) — import from `@/shared/hooks/use-pagination`:

```typescript
const pagination = usePagination(filteredItems, { initialItemsPerPage: 50 });

// Available properties/methods:
pagination.paginatedItems    // Current page items
pagination.currentPage       // Current page number
pagination.totalPages        // Total pages
pagination.itemsPerPage      // Items per page
pagination.totalItems        // Total item count
pagination.goToPage(n)       // Navigate to page
pagination.goToNextPage()
pagination.goToPreviousPage()
pagination.goToFirstPage()
pagination.goToLastPage()
pagination.resetPage()       // Reset to page 1
pagination.isFirstPage       // Boolean
pagination.isLastPage        // Boolean
```

> **Hook rules:**
> - Hooks are the **only** place React Query is used — services never import React Query
> - Every `useMutation` hook must invalidate relevant queries on success
> - Filter hooks use `useMemo` for expensive computations
> - List components must reset pagination when filters change:
>   ```typescript
>   useEffect(() => { pagination.resetPage(); }, [searchTerm, filterModule]);
>   ```

## Component Patterns

### Page Component (Composition Root)

Pages are thin wrappers that compose module components. Equivalent to `app.module.ts` on the backend:

```typescript
'use client';

import { RequestTagsUpload } from '@/modules/request-tags/components/request-tags-upload';
import { RequestTagsActions } from '@/modules/request-tags/components/request-tags-actions';
import { RequestTagsList } from '@/modules/request-tags/components/request-tags-list';

export default function RequestTagsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Request Tags</h1>
          <p className="mt-3 text-base text-muted-foreground/90">
            View and manage request tag data
          </p>
        </div>
        <RequestTagsUpload />
        <RequestTagsActions />
        <RequestTagsList />
      </main>
    </div>
  );
}
```

### Main List Component

Stateful component that wires hooks together — data, filters, pagination, and mutations:

```typescript
'use client';

export function RequestTagsList() {
  const { data, isLoading } = useRequestTags();
  const tags = data?.tags ?? [];

  const { searchTerm, setSearchTerm, filteredTags, ... } = useRequestTagsFilters(tags);
  const pagination = usePagination(filteredTags);

  useEffect(() => {
    pagination.resetPage();
  }, [searchTerm, filterModule]);

  if (isLoading) return <LoadingSkeleton />;
  if (tags.length === 0) return <EmptyState />;

  return (
    <>
      {/* Search & filter controls */}
      {/* Data table with pagination.paginatedItems */}
      {/* Pagination controls */}
    </>
  );
}
```

### Modal Components (Controlled)

Modals receive `open`, `onOpenChange`, `onSubmit`, and `isPending` as props. Reset form on close:

```typescript
'use client';

interface CreateEntityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateEntityData) => void;
  isPending: boolean;
}

export function CreateEntityModal({ open, onOpenChange, onSubmit, isPending }: CreateEntityModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) setName(''); // Reset on close
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Entity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### Delete Confirmation (AlertDialog)

```typescript
<AlertDialog open={open} onOpenChange={onOpenChange}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure? This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={onConfirm}
        disabled={isPending}
        className="bg-red-600 hover:bg-red-700"
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Upload Component

```typescript
'use client';

export function FeatureUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [currentFilename, setCurrentFilename] = useState('');
  const uploadMutation = useUploadFeature();

  useEffect(() => {
    const saved = localStorage.getItem('lastUploadedFeatureFile');
    if (saved) setCurrentFilename(saved);
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const result = await uploadMutation.mutateAsync(file);
      toast.success('Upload successful', {
        description: `Total: ${result.total} | Imported: ${result.imported} | Skipped: ${result.skipped}`,
      });
      setCurrentFilename(file.name);
      localStorage.setItem('lastUploadedFeatureFile', file.name);
      setFile(null);
    } catch (error) {
      toast.error('Upload failed', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}
```

## Shared Infrastructure

### API Client

Located at `shared/api/client.ts`. Fetch-based HTTP adapter with timeout and error handling:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const TIMEOUT_MS = 30000;

export const apiClient = {
  get: <T>(endpoint: string): Promise<T> => ...,
  post: <T>(endpoint: string, data: unknown): Promise<T> => ...,
  postForm: <T>(endpoint: string, formData: FormData): Promise<T> => ...,
  put: <T>(endpoint: string, data: unknown): Promise<T> => ...,
  patch: <T>(endpoint: string, data: unknown): Promise<T> => ...,
  delete: <T>(endpoint: string): Promise<T> => ...,
};
```

All methods use `fetchWithTimeout` and `handleResponse` (parses JSend errors).

### QueryProvider

Registered in `app/layout.tsx`. Configures React Query with 1-minute staleTime and no refetch on window focus.

## Testing Patterns

### Test Utilities

Located at `test/utils/test-utils.tsx`:

```typescript
// Creates a QueryClient with retry disabled and no GC delay
export function createTestQueryClient(): QueryClient;

// Wraps component in QueryClientProvider for testing
export function renderWithQueryClient(ui: ReactElement): RenderResult & { queryClient: QueryClient };

// Creates a wrapper function for renderHook
export function createQueryWrapper(): React.FC<{ children: ReactNode }>;
```

### Test Data Factory (faker)

Each module has a factory at `__tests__/helpers/{feature}.factory.ts`:

```typescript
import { faker } from '@faker-js/faker';
import type { RequestTag } from '@repo/reports/frontend';

export class RequestTagFactory {
  static create(overrides?: Partial<RequestTag>): RequestTag {
    return {
      requestId: overrides?.requestId ?? `REQ-${faker.string.alphanumeric(6).toUpperCase()}`,
      createdTime: overrides?.createdTime ?? faker.date.recent().toISOString().split('T')[0]!,
      informacionAdicional: overrides?.informacionAdicional ?? faker.lorem.sentence(),
      modulo: overrides?.modulo ?? faker.helpers.arrayElement(['Finanzas', 'Ventas', 'Operaciones']),
      problemId: overrides?.problemId ?? `PRB-${faker.string.alphanumeric(6).toUpperCase()}`,
      linkedRequestId: overrides?.linkedRequestId ?? `REQ-${faker.string.alphanumeric(6).toUpperCase()}`,
      jira: overrides?.jira ?? faker.helpers.arrayElement([`JIRA-${faker.number.int({ min: 100, max: 999 })}`, 'No asignado']),
      categorizacion: overrides?.categorizacion ?? faker.helpers.arrayElement(['Bug', 'Feature', 'Support']),
      technician: overrides?.technician ?? faker.person.fullName(),
    };
  }

  static createMany(count: number, overrides?: Partial<RequestTag>): RequestTag[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}
```

### Service Tests (Application Layer — fetch mocking)

Services are tested by mocking the global `fetch`. This validates the full flow: API call + JSend unwrapping + Zod parsing.

```typescript
import { requestTagsService } from '@/modules/request-tags/services/request-tags.service';
import { RequestTagFactory } from '../helpers/request-tag.factory';

describe('requestTagsService', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('should fetch all and unwrap JSend response', async () => {
    const mockTags = RequestTagFactory.createMany(3);

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        status: 'success',
        data: { tags: mockTags, total: mockTags.length },
      }),
    });

    const result = await requestTagsService.getAll();

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/request-tags'),
      expect.objectContaining({ cache: 'no-store' }),
    );
    expect(result.tags).toHaveLength(3);
  });
});
```

### Component Tests (Infrastructure Layer — vitest-mock-extended)

Component tests use `vitest-mock-extended` for type-safe service mocking via `MockProxy`. The service module is auto-mocked; the component is tested through its rendered output.

```typescript
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock, MockProxy } from 'vitest-mock-extended';
import { renderWithQueryClient } from '@/test/utils/test-utils';
import { RequestTagsList } from '@/modules/request-tags/components/request-tags-list';
import { requestTagsService } from '@/modules/request-tags/services/request-tags.service';
import { RequestTagFactory } from '../helpers/request-tag.factory';

// Mock the service module (application layer boundary)
vi.mock('@/modules/request-tags/services/request-tags.service');

// Type the mocked service as MockProxy for type-safe mock setup
let mockedService: MockProxy<typeof requestTagsService>;

describe('RequestTagsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedService = requestTagsService as MockProxy<typeof requestTagsService>;
  });

  it('should show loading state', () => {
    mockedService.getAll.mockReturnValue(new Promise(() => {}));
    renderWithQueryClient(<RequestTagsList />);
    expect(screen.getByText('Loading tags...')).toBeInTheDocument();
  });

  it('should display tags when loaded', async () => {
    const mockTags = [
      RequestTagFactory.create({ technician: 'John Doe' }),
      RequestTagFactory.create({ technician: 'Jane Smith' }),
    ];
    mockedService.getAll.mockResolvedValue({
      tags: mockTags,
      total: mockTags.length,
    });

    renderWithQueryClient(<RequestTagsList />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should filter by search term', async () => {
    const mockTags = [
      RequestTagFactory.create({ technician: 'John Doe' }),
      RequestTagFactory.create({ technician: 'Jane Smith' }),
    ];
    mockedService.getAll.mockResolvedValue({
      tags: mockTags,
      total: mockTags.length,
    });

    const user = userEvent.setup();
    renderWithQueryClient(<RequestTagsList />);

    await screen.findByText('John Doe');
    await user.type(screen.getByPlaceholderText(/search/i), 'John');

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });
});
```

> **Mocking pattern:**
> 1. `vi.mock('service-path')` — hoisted, auto-mocks all exports
> 2. `let mockedService: MockProxy<typeof service>` — typed reference
> 3. `mockedService = service as MockProxy<typeof service>` — cast in `beforeEach`
> 4. `mockedService.method.mockResolvedValue(...)` — type-safe mock setup

### E2E Tests (Playwright)

Located at `e2e/__tests__/`. Three ordered phases: `smoke` -> `seeded-data` -> `data-mutation`.

```typescript
import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Request Tags', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/request-tags');
  });

  test('should display page header', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Request Tags', exact: true })
    ).toBeVisible();
  });

  test('should upload Excel file', async ({ page }) => {
    const filePath = path.join(__dirname, '..', 'fixtures', 'data.xlsx');
    await page.locator('input[type="file"]').setInputFiles(filePath);
    await page.getByRole('button', { name: /upload/i }).click();
    await expect(page.getByText(/success/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should delete all records', async ({ page }) => {
    await page.getByRole('button', { name: /clear all data/i }).click();
    await page.getByRole('button', { name: /delete all/i }).click();
    await expect(page.getByText(/successfully deleted/i)).toBeVisible({ timeout: 10000 });
  });
});
```

## What Does NOT Exist

- **No local type definitions** — all entity types and Zod schemas come from `@repo/reports/frontend`. Modules never define their own interfaces.
- **No direct `fetch` calls in components or hooks** — all API access goes through `services/` (application layer boundary).
- **No `@repo/reports` imports** — frontend always uses `@repo/reports/frontend` (NestJS-free) for schemas/types, and `@repo/reports/common` for `parseJsendData`.
- **No React imports in services** — services are pure async functions with zero framework dependencies.
- **No inline query keys** — all keys defined in `keys.ts` factory.
- **No `window.alert()`** — notifications use `toast` from `sonner`.
- **No `bg-destructive`** — delete buttons use `bg-red-600 hover:bg-red-700`.

## Key Principles

| Rule | Right | Wrong |
|------|-------|-------|
| Dependency direction | components → hooks → services → types | services importing React hooks |
| Domain types | `import type { X } from '@repo/reports/frontend'` | Local interface definitions |
| Schemas/types source | `@repo/reports/frontend` | `@repo/reports` (includes NestJS deps) |
| JSend helpers | `@repo/reports/common` | Inline parsing logic |
| API response validation | `parseJsendData(zodSchema, raw)` | `response.data as T` type cast |
| API client generic | `apiClient.get<unknown>(...)` | `apiClient.get<MyType>(...)` |
| Service layer | Pure async — zero React imports | `useState` or `useQuery` in service |
| Imports | `@/modules/feature/...` | `../../../modules/feature/...` |
| Notifications | `toast.success(...)` from sonner | `window.alert(...)` |
| Delete button style | `bg-red-600 hover:bg-red-700` | `bg-destructive` |
| Modal pattern | Controlled via `open`/`onOpenChange` props | Uncontrolled or internal state |
| Form reset | Reset fields in `onOpenChange(false)` | Leave stale data on reopen |
| Test data | Factory with `faker` | Hardcoded inline objects |
| Component testing | `renderWithQueryClient()` | Raw `render()` without providers |
| Component mocking | `MockProxy<typeof service>` from `vitest-mock-extended` | `vi.mocked()` or manual cast |
| Service testing | `vi.stubGlobal('fetch', mockFetch)` | Mocking apiClient internals |
| Query keys | `keys.ts` factory | Inline string arrays |
| API calls in components | Via hooks only (`useRequestTags()`) | Direct `fetch` or `apiClient` calls |

## Data Flow

```
@repo/reports/frontend          ← DOMAIN (shared types + Zod schemas)
        ↑
services/{feature}.service.ts   ← APPLICATION (API orchestration + validation)
        ↑
hooks/use-{feature}.ts          ← INFRASTRUCTURE (React Query wrappers)
        ↑
components/{feature}-list.tsx   ← INFRASTRUCTURE (React UI)
        ↑
app/{feature}/page.tsx          ← COMPOSITION ROOT (wires components)
```

## Checklist

When creating or reviewing a frontend module, verify:

**Application Layer (services/):**
- [ ] Service uses `parseJsendData(zodSchema, raw)` — not type casting
- [ ] Service imports Zod schemas and types from `@repo/reports/frontend`
- [ ] Service has **zero React imports** — no hooks, no `useState`, no `useQuery`
- [ ] Service uses `apiClient.get<unknown>` — always `<unknown>` generic
- [ ] JSend helpers imported from `@repo/reports/common`

**Infrastructure Layer (hooks/):**
- [ ] Query keys defined in `keys.ts` with `as const`
- [ ] Fetch hooks use `useQuery` with keys from `keys.ts`
- [ ] Mutation hooks invalidate relevant queries on success
- [ ] Filter hook uses `useMemo` for filtered results
- [ ] List component resets pagination when filters change

**Infrastructure Layer (components/):**
- [ ] Modal components are controlled (`open`/`onOpenChange` props)
- [ ] Modal forms reset on close
- [ ] Delete uses `AlertDialog` with `bg-red-600 hover:bg-red-700`
- [ ] Create/Edit uses `Dialog`
- [ ] Notifications use `toast` from sonner
- [ ] Upload persists filename in `localStorage`
- [ ] All imports use `@/` alias
- [ ] Pages are `'use client'` and compose module components
- [ ] Components never call `apiClient` or `fetch` directly — always through hooks

**Testing:**
- [ ] Test factory exists at `__tests__/helpers/{feature}.factory.ts` using `faker`
- [ ] Factory imports types from `@repo/reports/frontend`
- [ ] Service tests mock `fetch` via `vi.stubGlobal`
- [ ] Component tests use `renderWithQueryClient()` and `MockProxy` from `vitest-mock-extended`
- [ ] Component tests mock at the service boundary (`vi.mock('service-path')`)
- [ ] E2E tests placed in correct phase (smoke/seeded-data/data-mutation)

## Reference Implementations

- **Full module with Zod validation:** `modules/request-tags/` (service, hooks, components, tests, factory)
- **Module with CRUD modals:** `modules/application-registry/` (create, edit, delete dialogs)
- **Test utilities:** `test/utils/test-utils.tsx` (renderWithQueryClient, createQueryWrapper)
- **API client:** `shared/api/client.ts`
- **Pagination hook:** `shared/hooks/use-pagination.ts`
