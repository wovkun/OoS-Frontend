import { ProviderRoles, Role } from 'shared/enum/role';

export function isRoleProvider(role: string | Role): boolean {
  return ProviderRoles.includes(role as Role);
}
