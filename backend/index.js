const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const District = require("./models/district");
const Taluka = require("./models/taluka");
const Village = require("./models/village");

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(cors());


console.log("index.js");
// Route for handling user-related API requests
app.use("/api/machine", require('./routes/machine'));
app.use("/api/user", require("./routes/user"));
app.use("/api/image", require("./routes/image"));
app.use("/api/review", require("./routes/review"));
app.use(errorHandler);
// Start the server and listen on the specified port

app.post("/api/get-villages", async (req, res) => {
  try {
    const { district_name, taluka_name } = req.body;

    console.log("district_name", district_name);
    console.log("taluka_name", taluka_name);  

    if (!district_name || !taluka_name) {
      return res
        .status(400)
        .json({ error: "District name and taluka name are required" });
    }

    const district = await District.findOne({ district_name });
    if (!district) {
      return res.status(404).json({ error: "District not found" });
    }

    console.log("district2", district);

    const taluka = await Taluka.findOne({
      taluka_name,
      district_id: district._id,
    });

    console.log("taluka", taluka);
    if (!taluka) {
      return res.status(404).json({ error: "Taluka not found" });
    }

    const villages = await Village.find({ taluka_id: taluka._id });
    console.log("villages", villages);
    res.status(200).json({ villages });
    
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching villages", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
