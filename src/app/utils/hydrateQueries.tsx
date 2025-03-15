'use client';

import { ReactNode } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

interface HydrateQueriesProps {
  children: ReactNode;
  state: unknown;
}

export function HydrateQueries({ children, state }: HydrateQueriesProps): ReactNode {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}

export async function prefetchQueries(
  queryClient: QueryClient,
  queries: Array<() => Promise<unknown>>
): Promise<unknown> {
  await Promise.all(queries.map((query) => query()));
  
  return dehydrate(queryClient);
} 