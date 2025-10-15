type JSTypesMap = {
  'boolean': boolean,
  'bigint': bigint,
  'number': number,
  'string': string,
  'symbol': symbol,
  'undefined': undefined,
  'object': object,
  'function': (...args: any[]) => any
};
type JSTypes = keyof JSTypesMap;

type GetType<T extends JSTypes[]> = {
  [I in keyof T]: JSTypesMap[T[I]]
}

declare function addImpl<T extends JSTypes[]>(...args: [
  ...T,
  (...args: GetType<T>) => any
]): void;