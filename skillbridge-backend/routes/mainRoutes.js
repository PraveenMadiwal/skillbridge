const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const { authorize } = require("../middleware/role");

// ================= CONTROLLERS =================

// Batch Controller
const {
  createBatch,
  joinBatch,
  generateInvite,
  getInstitutionStats,
} = require("../controllers/batchController");

// Session Controller
const {
  createSession,
  getMySessions,
  getTrainerSessions,
  getSessionStudents,
  getAllSessions,
  joinSession,
  getSessionDetails,
} = require("../controllers/sessionController");

// Attendance Controller
const {
  markAttendance,
  getSessionAttendance,
} = require("../controllers/attendanceController");

// ======================================================
// ===================== BATCHES =========================
// ======================================================

// Create Batch
router.post(
  "/batches",
  verifyToken,
  authorize(["trainer", "institution"]),
  createBatch
);

// Join Batch
router.post(
  "/batches/join",
  verifyToken,
  authorize(["student"]),
  joinBatch
);

// Generate Batch Invite
router.post(
  "/batches/:id/invite",
  verifyToken,
  authorize(["trainer"]),
  generateInvite
);

// ======================================================
// ===================== SESSIONS ========================
// ======================================================

// Create Session
router.post(
  "/sessions",
  verifyToken,
  authorize(["trainer"]),
  createSession
);

// Get All Sessions
router.get(
  "/sessions",
  verifyToken,
  getAllSessions
);

// Join Session
router.post(
  "/sessions/join",
  verifyToken,
  authorize(["student"]),
  joinSession
);

// Get Session Details
router.get(
  "/sessions/:id",
  verifyToken,
  getSessionDetails
);

// Student My Sessions
router.get(
  "/my-sessions",
  verifyToken,
  authorize(["student"]),
  getMySessions
);

// Trainer Sessions
router.get(
  "/trainer/sessions",
  verifyToken,
  authorize(["trainer"]),
  getTrainerSessions
);

// Get Students in Session
router.get(
  "/sessions/:id/students",
  verifyToken,
  authorize(["trainer"]),
  getSessionStudents
);

// ======================================================
// ==================== ATTENDANCE =======================
// ======================================================

// Mark Attendance
router.post(
  "/attendance/mark",
  verifyToken,
  authorize(["student"]),
  markAttendance
);

// Get Session Attendance
router.get(
  "/sessions/:id/attendance",
  verifyToken,
  authorize(["trainer"]),
  getSessionAttendance
);

// ======================================================
// =================== INSTITUTION =======================
// ======================================================

// Institution Dashboard Stats
router.get(
  "/institution/stats",
  verifyToken,
  authorize(["institution"]),
  getInstitutionStats
);

module.exports = router;