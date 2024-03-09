export const UserFields = {
  id: true,
  name: true,
  email: true,
  // todos: true,
  created_at: true,
  updated_at: true,
};

export function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}
