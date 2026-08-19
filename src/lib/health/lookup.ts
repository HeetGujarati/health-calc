/**
 * Totally-typed lookup over an array of identified records.
 *
 * Several modules here keep an ordered array as the source of truth — the order
 * is meaningful, because it is the order options appear in the UI — and also
 * need keyed access by id. A `Map` forces a non-null assertion at every call
 * site even though the key type guarantees a hit, and those assertions are
 * exactly the kind of thing that stays behind after a refactor makes them false.
 *
 * The mapped return type turns the lookup into a total function: for a key of
 * the union type, the result is the record, not `record | undefined`. The single
 * cast is contained here, where `Object.fromEntries`'s loose typing is the only
 * thing being worked around.
 */
export const indexById = <T extends { readonly id: string }>(
  items: readonly T[]
): { readonly [K in T['id']]: Extract<T, { readonly id: K }> } =>
  Object.fromEntries(items.map((item) => [item.id, item])) as {
    readonly [K in T['id']]: Extract<T, { readonly id: K }>;
  };
