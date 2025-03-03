const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
  getCategories,
  getMachines,
  getMachine,
  addMachine,
  updateMachine,
  deleteMachine,
  getMachinesAvailableInYourVillage,
  getMachineByCat,
  getMachinesByOwner,
} = require("../controllers/machineController");

console.log("machine.js");

// Public routes
router.post("/categories", getCategories);
router.post("/all", getMachines);

// Protected routes using validateToken middleware
router.get("/owner", validateToken, getMachinesByOwner);
router.get("/category/:category", validateToken, getMachineByCat);
router.post("/add", validateToken, addMachine);
router.put("/:id", validateToken, updateMachine);
router.delete("/:id", validateToken, deleteMachine);
router.get("/available/village",validateToken, getMachinesAvailableInYourVillage);
router.get("/:id", getMachine);

module.exports = router;
