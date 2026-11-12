if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>()

  const localStorageMock: Storage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, String(value))
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
    clear: () => store.clear(),
    key: (index: number) => [...store.keys()][index] ?? null,
    get length() {
      return store.size
    },
  }

  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    configurable: true,
  })
}
