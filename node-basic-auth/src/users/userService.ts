import * as fs from "fs";
import { User } from "./user";

export function authenticate({ username, password }): Promise<User> {
  const ret = new Promise<User>((resolve, reject) => {
    fs.readFile("users.json", (err, data: any) => {
      if (err) reject(err);
      const users = JSON.parse(data);
      const user = users.users.find(
        (u: User) => u.username === username && u.password === password
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

export async function getAll(): Promise<Array<User>> {
  const ret = new Promise<Array<User>>((resolve, reject) => {
    fs.readFile("users.json", (err, data: any) => {
      if (err) reject(err);
      const users = JSON.parse(data);
      resolve(users.users);
    });
  });
  return ret;;
}

export async function verify({ username, password }): Promise<User> {
  return authenticate({ username, password });
}
