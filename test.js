let par = '2015-12-25'
par = parseInt(par)
var date = new Date(par);
let mili = new Date();
console.log(date.toString())
if(par.toString().length == 13){
  date.setTime(par)
  console.log({first: date.getTime(), utc : date.toUTCString()})
}
else if(date.toUTCString() == "Invalid Date"){
  console.log({ error : "Invalid Date" })
}
else{  
    date.setTime(par)
    console.log({given: date.getTime(), utc : date.toUTCString()})
}