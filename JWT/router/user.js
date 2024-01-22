const router = require('express')();
const user = require('../controller/user');
const { validatorAccess } = require('../middleware/jwt');


router.post('/signup', user.signUp);
router.get('/my', validatorAccess, user.mypage);
router.patch('/info', validatorAccess);
router.patch('/password', validatorAccess);
router.delete('/delacc', validatorAccess);

module.exports = router;