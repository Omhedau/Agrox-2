const asyncHandler = require("express-async-handler");
const Machine = require("../models/machine");

//@desc Get All categories
//@desc GET /api/machine/categories
//@access Public
const getCategories = asyncHandler(async (req, res) => {
  const {village} = req.body;
  const categories = await Machine.find({ "operatingArea.village": { $in: [village] } }).distinct("name");
  if (categories) {
    res.status(200).json({
      message: "Categories found",
      categories
    });
  } else {
    res.status(404);
    throw new Error("No categories found");
  }
});

//@desc Get All machines
//@route GET /api/machine/all
//@access Public
const getMachines = asyncHandler(async (req, res) => {
  const { village, category} = req.body;
  console.log('getMachines');
  console.log(village);
  const machines = await Machine.find(
    { "operatingArea.village": { $in: [village] }, name: category }
  ).limit(30);
  if (machines) {
    res.status(200).json({
      message: "Machines found",
      machines
    });
  } else {
    res.status(404);
    throw new Error("No machines found");
  }
});

//@desc Get machine details
//@route GET /api/machine/:id
//@access Public
const getMachine = asyncHandler(async (req, res) => {
  const machineId = req.params.id;
  const user = req.user;
  console.log(user);
  const machine  = await Machine.findById(machineId);
  if (machine) {
    
    res.status(200).json({
      message: "Machine found",
      machine
    });
  } else {
    res.status(404);
    throw new Error("Machine not found");
  } 
});

//@desc Add a machine 
//@route POST /api/machine
//@access Private
const addMachine = asyncHandler(async (req, res) => {
  const { name, description, price, image, documents } = req.body;
  const machine = new Machine({
    name,
    description,
    price,
    image,
    documents,
  });
  const createdMachine = await machine.save();
  res.status(201).json({
    message: "Machine added successfully",
    machine: createdMachine,
  });
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
module.exports = { getCategories, getMachines, getMachine, addMachine, updateMachine, deleteMachine };