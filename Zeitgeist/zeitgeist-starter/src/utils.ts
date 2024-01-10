export function typesFromDefs(
  definitions: Record<string, { types: Record<string, any> }>
): Record<string, any> {
  return Object.values(definitions).reduce(
    (res: Record<string, any>, { types }): Record<string, any> => ({
      ...res,
      ...types,
    }),
    {}
  );
}
