import { getAllUsers } from './createUser.js';

export function updateUser(email, newPassword) {
  const users = getAllUsers();
  const user = users.find(u => u.email === email);

  if (!user) return null;

  user.password = newPassword; 
  return user;
}
