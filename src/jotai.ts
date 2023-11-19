export const atom = <AtomType>(
  initialValue: AtomType
): {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: (newValue: AtomType) => void) => () => void;
} => {
  const subscribers = new Set<(newValue: AtomType) => void>();
  let value = initialValue;

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
    },
    subscribe: (callback) => {
      subscribers.add(callback);

      return () => {
        subscribers.delete(callback);
      };
    },
  };
};
