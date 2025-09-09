// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const JWT_SECRET = "9f3b8c1d2a7e6b4f8d0a1c3e5b7f2d6a"; // Move to .env in production

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Simple routes
app.get("/", (req, res) => {
  res.send("Hello, RentMate Server is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy 🚀",
    timestamp: new Date()
  });
});

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://raghavirajadurai8_db_user:bKnEprct5iB9Oct4@cluster0.gc6w7de.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" }
  },
  { collection: "users", timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ✅ Registration API
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password, reEnterPassword, gender, role } = req.body;
    console.log("📩 Incoming data:", req.body);

    if (!name || !email || !password || !reEnterPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== reEnterPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Special check: Only one Admin per domain
    if (role === "Admin") {
      const domain = email.split("@")[1];
      const existingAdmin = await User.findOne({
        role: "Admin",
        email: new RegExp(`@${domain}$`, "i")
      });
      if (existingAdmin) {
        return res.status(400).json({ error: `An Admin already exists for domain @${domain}` });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      role: role || "User"
    });

    await newUser.save();

    res.status(201).json({
      message: "✅ Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        role: newUser.role,
        domain: email.split("@")[1]
      }
    });

  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// ✅ Login API (Admin & User)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: `✅ Login successful as ${user.role}`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        domain: user.email.split("@")[1]
      }
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
