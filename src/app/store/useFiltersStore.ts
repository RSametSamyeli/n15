import { create } from 'zustand';
import { FiltersState } from '../types/store';

const DEFAULT_FILTERS = {
  status: '',
  gender: '',
  page: 1,
  name: '',
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...DEFAULT_FILTERS,

  setStatus: (status) => set({ status }),
  setGender: (gender) => set({ gender }),
  setPage: (page) => set({ page }),
  setName: (name) => set({ name }),
  
  resetFilters: () => set(DEFAULT_FILTERS),
})); 