var blessed = require('blessed')
  , contrib = require('blessed-contrib')
  , screen = blessed.screen()

var table = contrib.table(
   { keys: true
   , vi: true
   , fg: 'white'
   , selectedFg: 'white'
   , selectedBg: 'blue'
   , interactive: true
   , label: 'Active Processes'
   , width: '100%'
   , height: '100%'
   , border: {type: "line", fg: "cyan"}
   , columnSpacing: 10
   , columnWidth: [12, 12]})

table.focus()
screen.append(table)

table.setData(
 { headers: ['col1', 'col2']
 , data:
  [ [1, 2]
  , [3, 4]
  , [5, 6]
  , [7, 8] ]})

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render()