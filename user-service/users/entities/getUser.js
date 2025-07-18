import bcrypt from 'bcrypt';
import { getAllUsers } from './createUser.js';

export async function authenticateUser(email, password) {
  const user = getAllUsers().find(u => u.email === email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
