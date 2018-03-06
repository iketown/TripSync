const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groups.controller')

router.post('/', groupsController.createGroup)
router.get('/', groupsController.getGroups)
router.get('/:id', groupsController.getGroup)
router.delete('/:id', groupsController.deleteGroup)
router.put('/:id', groupsController.updateGroup)

module.exports = router