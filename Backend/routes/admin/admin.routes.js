const express = require('express');
const router = express.Router();

const admin= require('../../controllers/admin.controller');

router.post('/tabaledata/add',admin.addtableData);
router.get('/tabaledata', admin.gettableData);
router.patch('/edit/dispute', admin.updatetabledata);
module.exports = router;
