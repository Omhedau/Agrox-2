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
  getMachinesByOwner
} = require("../controllers/machineController");

console.log("machine.js");

// Public routes
router.post("/categories", getCategories);
router.post("/all", getMachines);
router.get("/:id", getMachine); // Use a specific ID parameter for fetching a machine
router.get("/category/:category", getMachineByCat);
// Routes protected by validateToken middleware
router.use(validateToken);

router.get("/owner", getMachinesByOwner);
router.post("/add", addMachine);
router.put("/:id", updateMachine); // Use PUT for updates, with ID parameter
router.delete("/:id", deleteMachine); // Use DELETE for deleting, with ID parameter
router.get("/available/village", getMachinesAvailableInYourVillage); // Clearer route for available machines in a village

module.exports = router;
