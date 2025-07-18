import bcrypt from 'bcrypt';

const users = []; 

export async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };
  users.push(user);
  return user;
}

export function getAllUsers() {
  return users;
}