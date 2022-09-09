import {readFile, writeFile, promises as fsPromises} from 'fs';

readFile('./example.txt', 'utf-8', function (err, contents) {
  if (err) {
    console.log(err);
    return;
  }

  const replaced = contents.replace(/to be replaced/g, 'replacement string');

  writeFile('./example.txt', replaced, 'utf-8', function (err) {
    console.log(err);
  });
});