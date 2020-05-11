var async = require('async')
var ps = require('child_process')

function piped_exec(cmd_str){
  return (cb) => {
    const cmd = ps.exec(cmd_str, cb)
    cmd.stdout.pipe(process.stdout)
    cmd.stderr.pipe(process.stderr)
  }
}

var serial_process = [
  piped_exec("echo 'test' > test.txt"),
  piped_exec("cat test.txt"),
  piped_exec("sleep 10"),
  // The following command will fail
  piped_exec("cat boom.txt"),
  piped_exec("echo 'test2' >> test.txt"),
  piped_exec("cat test.txt"),
]

async.series(serial_process,(err,result) => {
  if(err){

    console.log('process failed...')
  }else{

    console.log('process complete...')
  }
})