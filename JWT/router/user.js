const router = require('express')();
const user = require('../controller/user');
const { validateAccess } = require('../middleware/jwt');


router.post('/signup', user.signUp);
router.get('/my', validateAccess, user.mypage);
router.patch('/info', validateAccess, user.info);
router.patch('/password', validateAccess, user.password);
router.delete('/delacc', validateAccess, user.delacc);

module.exports = router;