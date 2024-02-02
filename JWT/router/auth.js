const router = require('express')();
const auth = require('../controller/auth');
const { validate } = require('../controller/user');
const { validateWitMail, validateAccess } = require('../middleware/jwt');

router.post('/signin', auth.signIn);
router.post('/send', validateWitMail);
router.post('/check', validate);
router.get('/refresh', validateAccess, auth.refresh);

module.exports = router;