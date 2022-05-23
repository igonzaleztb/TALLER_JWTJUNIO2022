const router = require("express").Router();

const user = require("../controllers/user.controllers");

router.post("/confirmuser", user.confirmedUser);
router.get("/confirmuser/:id/:token", user.confirmUserGet);
router.post("/confirmuser/:id/:token", user.checkUserPost);
router.get("/datauser", user.dataUser);
 

module.exports = router;
