export type AccessType = 'V' | 'E' | 'X' | 'S' | 'A' | 'B' | 'C';

export type RequiredPermissionsT = 'view' | 'edit' | 'execute' | 'schedule';

const ACCESS_LEVELS = {
  V: ['view'],
  E: ['view', 'edit'],
  A: ['view', 'schedule'],
  B: ['view', 'execute'],
  X: ['view', 'edit', 'execute'],
  C: ['view', 'execute', 'schedule'],
  S: ['view', 'edit', 'execute', 'schedule']
};

export const hasAccessPermission = (
  accessType: AccessType,
  requiredPermissions: RequiredPermissionsT[]
): boolean => {
  if (!accessType || !requiredPermissions || !Array.isArray(requiredPermissions)) {
    console.error('Invalid accessType or requiredPermissions provided');
    return false;
  }
  const userPermissions = ACCESS_LEVELS[accessType];

  if (!userPermissions) {
    console.error(`No permissions found for accessType: ${accessType}`);
    return false;
  }
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
};
