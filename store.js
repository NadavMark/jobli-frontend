import create from 'zustand';

export const useStore = create(set => ({
  isLoading: false,
  showLoader: (isLoading) => set(state => ({ isLoading: isLoading }))
}))