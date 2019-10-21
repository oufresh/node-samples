import * as fs from "fs";

export function authenticate({ username, password }) {
  const ret = new Promise((resolve, reject) => {
    fs.readFile("users/users.json", (err, data: any) => {
      if (err) reject(err);
      const users = JSON.parse(data);
      const user = users.users.find(
        u => u.username === username && u.password === password
      );
      if (user) {
        const { password, ...userWithoutPassword } = user;
        const authdata = Buffer.from(username + ":" + password).toString(
          "base64"
        );
        resolve({ ...userWithoutPassword, authdata });
      } else resolve(null);
    });
  });
  return ret;
}

export async function getAll() {
  /*return config.users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });*/
}

export async function verify({ username, password }) {
  /*const user = config.users.find(
    u => u.username === username && u.password === password
  );
  if (user) return true;
  else return false;*/
}
