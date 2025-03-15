import { QueryClient, dehydrate } from '@tanstack/react-query';

export async function prefetchQueries(
  queryClient: QueryClient,
  queries: Array<() => Promise<unknown>>
): Promise<unknown> {
  await Promise.all(queries.map((query) => query()));
  
  return dehydrate(queryClient);
} 