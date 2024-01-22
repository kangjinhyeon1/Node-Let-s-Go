const router = require('express')();
const auth = require('../controller/auth');
const { validatorAccess } = require('../middleware/jwt');

router.post('/signin', auth.signIn);
router.get('/refresh',);

module.exports = router;