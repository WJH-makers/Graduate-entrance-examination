import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const resolveInitialPage = () => {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace('#', '')
  return ['home', 'knowledge', 'plan', 'workbench'].includes(hash) ? hash : 'home'
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      // UI state
      activePage: resolveInitialPage(),
      searchTerm: '',
      codexOpen: false,
      paletteOpen: false,

      // user preferences
      theme: 'light',
      user: { name: '考研学子', goal: '2026上岸' },

      // actions
      setActivePage: (page) => set({ activePage: page }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setCodexOpen: (value) =>
        set((state) => ({
          codexOpen: typeof value === 'function' ? value(state.codexOpen) : Boolean(value),
        })),
      setPaletteOpen: (value) =>
        set((state) => ({
          paletteOpen: typeof value === 'function' ? value(state.paletteOpen) : Boolean(value),
        })),
      setTheme: (theme) => set({ theme }),
      setUser: (user) => set({ user }),
      togglePage: (page) => {
        const next = page || (get().activePage === 'home' ? 'knowledge' : 'home')
        set({ activePage: next })
        if (typeof window !== 'undefined') {
          const nextHash = `#${next}`
          if (window.location.hash !== nextHash) {
            window.history.replaceState(null, '', nextHash)
          }
        }
      },
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
      }),
    }
  )
)
