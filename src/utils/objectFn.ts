export const valueForKeyPath = (obj: any, path: string) => {
  const keys = path.split('.') || [];
  keys.forEach(key => (obj = obj[key] || ''));
  return obj;
};
