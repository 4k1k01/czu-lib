export default async function login(username, password) {
  if (!username || !password) {
    throw new Error('Missing username or password');
  }
}