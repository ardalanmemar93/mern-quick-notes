const express = require('express')
const router = express.Router()
const notesCtrl = require('../../controllers/api/notes')

//POST route to handle a controller function 
router.post('/', notesCtrl.createNote)

router.get('/', notesCtrl.index);

module.exports = router