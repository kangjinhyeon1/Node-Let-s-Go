const app = require('express')();
const board = require('../controller/board');

app.get('/', board.getList);
app.post('/create', board.create);
app.get('/:id', board.getOne);
app.put('/:id', board.putOne);
app.patch('/:id', board.patchOne);
app.delete('/:id', board.deleteOne);

module.exports = app;