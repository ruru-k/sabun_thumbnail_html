const fs = require('fs');
const regex = new RegExp('^.*\.jpg|jpeg|png');
fs.readdir('.', function(err, files){
  if (err) throw err;
  const fileList = files.filter(function(file){
      return fs.statSync(file).isFile() && regex.test(file); //絞り込み
  })

  const data = `const all = [${fileList.map(src=>`'${src}'`)}]`;
  fs.writeFile("./js/all_src.js", data, (err) => {
    if (err) throw err;
    console.log('正常に書き込みが完了しました');
  });
});