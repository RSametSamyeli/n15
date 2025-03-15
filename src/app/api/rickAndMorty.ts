import { Character, ApiResponse, CharacterFilters } from '../types/rickAndMorty';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(filters: CharacterFilters = {}): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, String(value));
    }
  });
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(`${API_BASE_URL}/character${queryString}`, {
    cache: 'no-store',
    next: { revalidate: 5 }
  });
  
  if (!response.ok) {
    throw new Error(`API isteği başarısız: ${response.status}`);
  }
  
  return response.json();
}

export async function getCharacterById(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`, {
    cache: 'no-store',
    next: { revalidate: 5 }
  });
  
  if (!response.ok) {
    throw new Error(`Karakter bulunamadı: ${id}`);
  }
  
  return response.json();
} 