const router = require('express')();
const user = require('../controller/user');

router.post('/signup', user.signUp);
router.get('/my',);
router.patch('/info',);
router.patch('/password',);
router.delete('/delacc',);

module.exports = router;