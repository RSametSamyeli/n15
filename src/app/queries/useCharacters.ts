import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCharacters } from '../api/rickAndMorty';
import { CharacterFilters, ApiResponse, Character } from '../types/rickAndMorty';

export const charactersQueryKey = (filters: CharacterFilters): ['characters', CharacterFilters] => ['characters', filters];

export function useCharacters(filters: CharacterFilters = {}): UseQueryResult<ApiResponse<Character>, Error> {
  return useQuery<ApiResponse<Character>, Error>({
    queryKey: charactersQueryKey(filters),
    queryFn: () => getCharacters(filters),

    placeholderData: (previousData) => previousData,
  });
} 