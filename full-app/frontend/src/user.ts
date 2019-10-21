export function loadUser(userName: string, password: string): Promise<any> {
  const p = new Promise((res, rej) => {
    debugger;
    fetch("users/authenticate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName,
        password
      })
    })
      .then(r => r.json())
      .then(data => {
        debugger;
        res(data);
      })
      .catch(e => rej(e));
  });
  return p;
}
