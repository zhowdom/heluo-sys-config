// addImpl('boolean', 'bigint', 'number', (a, b, c) => {})

/**[前置的不定量参数]
 * addImpl函数前面有不确定的多个参数（可以不传也可以传100个，不定量），最后一个参数是一个函数，
 * 且最后一个参数（函数）的参数的数量、参数类型需要与addImpl函数前面的那些参数逐一对应。
 */
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

// addImpl('boolean', 'string', (a, b) => {});