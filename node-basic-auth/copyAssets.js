var shell = require('shelljs');
shell.rm("-rf", "dist");
shell.mkdir("dist");
shell.cp('users.json', 'dist/users.js');
shell.cp('-R', 'config', 'dist');
