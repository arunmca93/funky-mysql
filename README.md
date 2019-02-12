
# funky-mysql

Funky mysql used for mysql DB access.

## Installation

Run below command to install funky-mysql.

```bash
npm install funky-mysql
```

## Usage

```nodejs
const funkymysql = require('funky-mysql')
var db = new funkymysql({
    host:'localhost', // Your Hostname or Host IP
    user:'root',      // Username of database
    password:'',      // Password of database 
    database:'mysql'  // Name of Database  
})

var result = db.get('help_category')
console.log(result)
```

## Output

```
[ { help_category_id: 1,
    name: 'Geographic',
    parent_category_id: 0,
    url: '' },
  { help_category_id: 2,
    name: 'Polygon properties',
    parent_category_id: 35,
    url: '' }
            .
            .
            .
            .
            .
  { help_category_id: 40,
    name: 'Data Definition',
    parent_category_id: 36,
    url: '' } ]

```
## Big Thanks

Our sincere thanks to sync-mysql
