# sequelize-top-level-where-clause
This repo shows the exception when applying [top level where clause](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#:~:text=To%20obtain%20top%2Dlevel%20WHERE,a%20top%2Dlevel%20WHERE%20clause.) and using `$nested.column$`.

I used `findAndCountAll` with `offset` and `limit`.

### Output Query
`SELECT `Customer`.`customer_id`, `Customer`.`name` FROM `customer` AS `Customer` WHERE `purchases`.`purchase_id` = 2 LIMIT 0, 1;`

### Exception
`{
  name: 'SequelizeDatabaseError',
  parent: 
  [Error: SQLITE_ERROR: no such column: purchases.purchase_id] 
  {
    errno: 1,
    code: 'SQLITE_ERROR',
    sql: 'SELECT `Customer`.`customer_id`, `Customer`.`name` FROM `customer` AS `Customer` WHERE `purchases`.`purchase_id` = 2 LIMIT 0, 1;'
  },
  original: 
  [Error: SQLITE_ERROR: no such column: purchases.purchase_id] 
  {
    errno: 1,
    code: 'SQLITE_ERROR',
    sql: 'SELECT `Customer`.`customer_id`, `Customer`.`name` FROM `customer` AS `Customer` WHERE `purchases`.`purchase_id` = 2 LIMIT 0, 1;'
  },
  sql: 'SELECT `Customer`.`customer_id`, `Customer`.`name` FROM `customer` AS `Customer` WHERE `purchases`.`purchase_id` = 2 LIMIT 0, 1;',
  parameters: {}
}`

## How to run the project?
- Clone the repo `git clone https://github.com/talmurshidi/sequelize-top-level-where-clause.git` 
- Install node packages `npm install`
- Use `npm run watch` CLI and check the results in the terminal.

## Version:
- node v16.14.2
- sequelize v6.19.0
- sequelize-cli v6.4.1
- sqlite3 v5.0.8