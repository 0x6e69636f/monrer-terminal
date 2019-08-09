const request = require('request');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const screen = blessed.screen();

const table = contrib.table({ 
  keys: true, 
  vi: true, 
  fg: 'white',
  //bg: 'black',
  width: '100%',
  height: '100%',
  border: {type: "dotted", fg: "white"},
  columnSpacing: 5,
  columnWidth: [4, 8, 6, 5, 40, 200]
})

table.focus()
screen.append(table)

const options = {
  url: 'http://monrer.fr/json?s=PSL',
  headers: {
    "Host": "monrer.fr",
    "Referer": "http://monrer.fr/?s=PSL",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; ) Gecko/20100101 Firefox/68.0"
  }
};

function onData(err, resp, body) {
  if (err) return; // console.log(err);
  if (resp.statusCode != 200) return; // console.log(resp);

  try {
    var data = JSON.parse(body);
    updateDisplay(data.trains);
  }

  catch(e) {
    // console.log(e)
  }
       
}

function updateDisplay(data) {
  var arrayData = data.map(train => {
    return [
      train.mission,
      train.time,
      train.retard.replace("à l'heure", ""),
      train.ligne,
      train.destination
//      train.dessertes.replace(/\&bull;/g, "-").trim()
    ]
  })
  
  /*.reduce((result,train) => {
    var desserte = train.pop();
    var desserteArr = desserte.split('|');
    train.push(desserteArr.shift());
    result.push(train);
    desserteArr.forEach(e => {
      result.push(['', '', '', '', '# ' + e.trim()])
    });

    return result;
  }, []);*/

  table.setData({
    headers: ['Code', 'Heure', 'Retard', 'Ligne', 'Destination'],
    data: arrayData
  })

  screen.render();
};

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
 return process.exit(0);
});

screen.render()
setInterval(() => {
  request(options, onData);
}, 30000);

request(options, onData);
