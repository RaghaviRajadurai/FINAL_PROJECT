// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const JWT_SECRET = "9f3b8c1d2a7e6b4f8d0a1c3e5b7f2d6a"; // ⚠️ Use .env in production

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
  "mongodb+srv://raghavirajadurai8_db_user:bKnEprct5iB9Oct4@cluster0.gc6w7de.mongodb.net/test"
)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* ---------------------- USER SCHEMA ---------------------- */
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

/* ---------------------- POLL SCHEMA ---------------------- */
const pollSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    options: [{ type: String, required: true }],
    createdBy: { type: String, required: true }, // Poll Creator email
    votes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        selectedOption: { type: String, required: true }
      }
    ]
  },
  { collection: "polls", timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);

/* ---------------------- USER ROUTES ---------------------- */

// Registration
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password, reEnterPassword, gender, role } = req.body;
    if (!name || !email || !password || !reEnterPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== reEnterPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, gender, role: role || "User" });
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

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Account not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

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


// ✅ Get registered users count
app.get("/api/users/registered-count", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ registeredUsers: userCount });
  } catch (err) {
    console.error("❌ Error fetching registered users:", err);
    res.status(500).json({ error: "Failed to fetch registered users count" });
  }
});


// // Get number of registered users
// app.get("/api/users/registered-count", async (req, res) => {
//   try {
//     const userCount = await User.countDocuments({});

//     res.status(200).json({
//       registeredUsers: userCount,
//     });
//   } catch (err) {
//     console.error("❌ Error fetching registered users:", err);
//     res.status(500).json({ error: "Failed to fetch registered users count" });
//   }
// });


/* ---------------------- POLL ROUTES ---------------------- */

// Create Poll
app.post("/api/polls", async (req, res) => {
  try {
    const { title, description, options, createdBy } = req.body;
    if (!title || !description || !options || options.length < 2) {
      return res.status(400).json({ error: "Title, description, and at least 2 options are required" });
    }
    const newPoll = new Poll({ title, description, options, createdBy });
    await newPoll.save();
    res.status(201).json({ message: "✅ Poll created successfully", poll: newPoll });
  } catch (err) {
    console.error("❌ Error creating poll:", err);
    res.status(500).json({ error: "Failed to create poll" });
  }
});

// Get all polls
app.get("/api/polls", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (err) {
    console.error("❌ Error fetching polls:", err);
    res.status(500).json({ error: "Failed to fetch polls" });
  }
});

// Get poll participation (total votes)
app.get("/api/polls/participation", async (req, res) => {
  try {
    const polls = await Poll.find();
    const totalVotes = polls.reduce((sum, poll) => sum + poll.votes.length, 0);
    res.status(200).json({ totalVotes });
  } catch (err) {
    console.error("❌ Error fetching participation:", err);
    res.status(500).json({ error: "Failed to fetch poll participation" });
  }
});

// Get single poll
app.get("/api/polls/:pollId", async (req, res) => {
  try {
    const { pollId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(pollId)) return res.status(400).json({ error: "Invalid Poll ID format" });

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    res.status(200).json(poll);
  } catch (err) {
    console.error("❌ Error fetching poll:", err);
    res.status(500).json({ error: "Failed to fetch poll" });
  }
});

// Vote on poll
app.post("/api/polls/:pollId/vote", async (req, res) => {
  try {
    const { pollId } = req.params;
    const { userId, selectedOption } = req.body;

    if (!mongoose.Types.ObjectId.isValid(pollId)) return res.status(400).json({ error: "Invalid Poll ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ error: "User not registered. Please sign up first." });

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    if (!poll.options.includes(selectedOption)) return res.status(400).json({ error: "Invalid option selected" });

    const alreadyVoted = poll.votes.find(v => v.userId.equals(userId));
    if (alreadyVoted) return res.status(400).json({ error: "User has already voted" });

    poll.votes.push({ userId, name: user.name, email: user.email, selectedOption });
    await poll.save();

    res.status(200).json({
      message: "✅ Vote recorded successfully",
      vote: { pollId, user: user.name, email: user.email, selectedOption }
    });
  } catch (err) {
    console.error("❌ Error voting:", err);
    res.status(500).json({ error: "Failed to vote" });
  }
});

// Poll results with percentages
app.get("/api/polls/:pollId/results", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    const totalVotes = poll.votes.length;
    const results = poll.options.map(option => {
      const voteCount = poll.votes.filter(v => v.selectedOption === option).length;
      const percentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : 0;
      return { option, votes: voteCount, percentage: Number(percentage) };
    });

    res.status(200).json({ pollId: poll._id, title: poll.title, totalVotes, results });
  } catch (err) {
    console.error("❌ Error fetching results:", err);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
