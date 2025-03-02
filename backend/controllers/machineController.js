const asyncHandler = require("express-async-handler");
const Machine = require("../models/machine");
const User = require("../models/user");

//@desc Get All categories
//@desc GET /api/machine/categories
//@access Public
const getCategories = asyncHandler(async (req, res) => {
  const { village } = req.body;
  const categories = await Machine.find({
    "operatingArea.village": { $in: [village] },
  }).distinct("name");
  if (categories) {
    res.status(200).json({
      message: "Categories found",
      categories,
    });
  } else {
    res.status(404);
    throw new Error("No categories found");
  }
});

//@desc Get All machines
//@route GET /api/machine/all
//@access Public
const getMachinesAvailableInYourVillage = asyncHandler(async (req, res) => {
  console.log("Fetching available machines in user's village...", req.user);

  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    // Fetch machines that have the user's village in their operatingArea
    const machines = await Machine.find({
      operatingArea: { $in: [user.village] },
    }).populate("ownerId", "name");

    if (machines.length > 0) {
      console.log("[INFO] - Machines found for the user's village");
      return res.status(200).json({ message: "Machines available", machines });
    } else {
      console.warn("[WARN] - No machines found in the user's village");
      return res
        .status(404)
        .json({ message: "No machines available in your village" });
    }
  } catch (error) {
    console.error("[ERROR] - Failed to fetch machines:", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

//@desc Get machines by owner ID
//@route GET /api/machine/owner/:ownerId
//@access Public
const getMachinesByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.params.ownerId;
  console.log(`[DEBUG] - Fetching machines for owner ID: ${ownerId}`);

  try {
    const machines = await Machine.find({ ownerId });
    console.log("[INFO] - Machines fetched successfully");

    if (machines.length > 0) {
      res.status(200).json({
        message: "Machines found",
        machines,
      });
    } else {
      console.warn("[WARN] - No machines found for the owner");
      res.status(404).json({ message: "No machines found" });
    }
  } catch (error) {
    console.error("[ERROR] - Failed to fetch machines:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

const getMachines = asyncHandler(async (req, res) => {
  const { village, category } = req.body;
  console.log("getMachines");
  console.log(village);
  const machines = await Machine.find({
    "operatingArea.village": { $in: [village] },
    name: category,
  }).limit(30);
  if (machines) {
    res.status(200).json({
      message: "Machines found",
      machines,
    });
  } else {
    res.status(404);
    throw new Error("No machines found");
  }
});

//@desc Get machine details
//@route GET /api/machine/:id


// const getMachine = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   console.log("[DEBUG] - Request URL:", req.originalUrl);
//   console.log("[DEBUG] - Request params:", req.params);
//   console.log(`[DEBUG] - Fetching machine details for ID: ${id}`);

//   // Validate MongoDB ObjectId format
  
//   try {
//     const machine = await Machine.findById(id);

//     if (!machine) {
//       console.warn(`[WARN] - Machine not found for ID: ${machineId}`);
//       return res.status(404).json({ message: "Machine not found" });
//     }

//     console.log("[INFO] - Machine found:", machine);
//     res.status(200).json({
//       message: "Machine found successfully",
//       machine,
//     });
//   } catch (error) {
//     console.error("[ERROR] - Failed to fetch machine details:", error.message);
//     res.status(500).json({
//       error: "Internal server error",
//       details: error.message,
//     });
//   }
// });


const getMachine = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("[DEBUG] - Request URL:", req.originalUrl);
  console.log("[DEBUG] - Request params:", req.params);
  console.log(`[DEBUG] - Fetching machine details for ID: ${id}`);

  try {
    // Fetch the machine and populate the ownerId field with user data
    const machine = await Machine.findById(id).populate({
      path: "ownerId",
      select: "name mobile role profile village", // Include fields you want to fetch
      populate: {
        path: "village", // Populate the village field in the user document
        select: "village_name village_code", // Only include village_name and village_code
      },
    });

    if (!machine) {
      console.warn(`[WARN] - Machine not found for ID: ${id}`);
      return res.status(404).json({ message: "Machine not found" });
    }

    console.log("[INFO] - Machine found:", machine);
    res.status(200).json({
      message: "Machine found successfully",
      machine,
    });
  } catch (error) {
    console.error("[ERROR] - Failed to fetch machine details:", error.message);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

//@desc Add a machine
//@route POST /api/machine
//@access Private

const addMachine = asyncHandler(async (req, res) => {
  try {
    const ownerId = req.user?.id;
    const machineData = req.body;

    console.log(
      `[DEBUG] - Request received to add machine by user: ${ownerId}`
    );

    // Validate required fields
    if (
      !machineData.name ||
      !machineData.yearOfMfg ||
      !machineData.rentalCost ||
      !machineData.rentalUnit
    ) {
      console.error("[ERROR] - Missing required machine details");
      return res
        .status(400)
        .json({
          error:
            "Missing required fields: name, yearOfMfg, rentalCost, rentalUnit",
        });
    }

    console.log("[INFO] - Valid machine data received, proceeding to save");

    const machine = new Machine({ ownerId, ...machineData });

    console.log("[DEBUG] - Machine object before saving:", machine);

    const createdMachine = await machine.save();

    console.log(
      `[SUCCESS] - Machine added successfully. Machine ID: ${createdMachine._id}`
    );

    res.status(201).json({
      message: "Machine added successfully",
      machine: createdMachine,
    });
  } catch (error) {
    console.error("[ERROR] - Failed to add machine:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

//@desc Update a machine
//@route PUT /api/machine/:id
//@access Private
const updateMachine = asyncHandler(async (req, res) => {
  const machineId = req.params.id;
  const { name, description, price, image, documents } = req.body;
  const machine = await Machine.findById(machineId);
  if (machine) {
    machine.name = name;
    machine.description = description;
    machine.price = price;
    machine.image = image;
    machine.documents = documents;
    const updatedMachine = await machine.save();
    res.status(200).json({
      message: "Machine updated successfully",
      machine: updatedMachine,
    });
  } else {
    res.status(404);
    throw new Error("Machine not found");
  }
});

//@desc Delete a machine
//@route DELETE /api/machine/:id
//@access Private
const deleteMachine = asyncHandler(async (req, res) => {
  const machineId = req.params.id;
  const machine = await Machine.findById(machineId);
  if (machine) {
    await machine.remove();
    res.status(200).json({
      message: "Machine deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Machine not found");
  }
});

module.exports = {
  getCategories,
  getMachines,
  getMachine,
  addMachine,
  updateMachine,
  deleteMachine,
  getMachinesAvailableInYourVillage,
  getMachinesByOwner,
};
