import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCharacterById } from '../api/rickAndMorty';
import { Character } from '../types/rickAndMorty';

export const characterByIdQueryKey = (id: number): [string, number] => ['character', id];

export function useCharacterById(id: number): UseQueryResult<Character, Error> {
  return useQuery<Character, Error>({
    queryKey: characterByIdQueryKey(id),
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });
} 