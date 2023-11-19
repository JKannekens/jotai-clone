import { useEffect, useState } from "react";

interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: (newValue: AtomType) => void) => () => void;
}

export const atom = <AtomType>(initialValue: AtomType): Atom<AtomType> => {
  const subscribers = new Set<(newValue: AtomType) => void>();
  let value = initialValue;

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      subscribers.forEach((callback) => callback(newValue));
    },
    subscribe: (callback) => {
      subscribers.add(callback);

      return () => {
        subscribers.delete(callback);
      };
    },
  };
};

export const useAtom = <AtomType>(
  atom: Atom<AtomType>
): [AtomType, (newValue: AtomType) => void] => {
  const [value, setValue] = useState(atom.get());

  useEffect(() => {
    const unsubscribe = atom.subscribe(setValue);

    return () => {
      unsubscribe();
    };
  }, [atom]);

  return [value, atom.set];
};
