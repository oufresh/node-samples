export function loadUser(userName: string): Promise<any> {
  const p = new Promise((res, rej) => {
    fetch("users/" + userName)
      .then(r => r.json())
      .then(data => res(data))
      .catch(e => rej(e));
  });
  return p;
}
