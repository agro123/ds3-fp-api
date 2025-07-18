import { getAllUsers } from './createUser.js';

export function deleteUser(email) {
  const users = getAllUsers();
  const index = users.findIndex(u => u.email === email);

  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}