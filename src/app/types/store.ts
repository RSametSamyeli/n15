
export interface FiltersState {
  status: string;
  gender: string;
  page: number;
  name: string;

  setStatus: (status: string) => void;
  setGender: (gender: string) => void;
  setPage: (page: number) => void;
  setName: (name: string) => void;
  resetFilters: () => void;
} 