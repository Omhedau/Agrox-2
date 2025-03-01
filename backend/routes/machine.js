const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { getCategories, getMachines, getMachine, addMachine, updateMachine, deleteMachine } = require("../controllers/machineController"); 

console.log("machine.js");
router.post("/categories", getCategories);
router.post("/all", getMachines);
router.get("/", getMachine);
router.post("/", addMachine);
router.get("/:id", getMachine);
router.post("/add", addMachine);
router.use(validateToken);

module.exports = router;
