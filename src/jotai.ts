import { useSyncExternalStore } from "react";

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
  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set];
};
