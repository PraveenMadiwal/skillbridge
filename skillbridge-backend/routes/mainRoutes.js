const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const { authorize } = require("../middleware/role");

// ================= CONTROLLERS =================


const {
  getStudentProfile,
  updateStudentName,
  updateStudentPassword,
} = require("../controllers/studentController");

const {
  getTrainerProfile,
  updateTrainerName,
  updateTrainerPassword,
} = require("../controllers/authController");
// ======================================================
// ==================== STUDENT PROFILE ==================
// ======================================================

// Get Student Profile
router.get(
  "/student/profile",
  verifyToken,
  authorize(["student"]),
  getStudentProfile
);

// Update Student Name
router.put(
  "/student/update-name",
  verifyToken,
  authorize(["student"]),
  updateStudentName
);

// Update Student Password
router.put(
  "/student/update-password",
  verifyToken,
  authorize(["student"]),
  updateStudentPassword
);

// ======================================================
// ================= TRAINER PROFILE =====================
// ======================================================

// Get Trainer Profile
router.get(
  "/trainer/profile",
  verifyToken,
  authorize(["trainer"]),
  getTrainerProfile
);

// Update Trainer Name
router.put(
  "/trainer/update-name",
  verifyToken,
  authorize(["trainer"]),
  updateTrainerName
);

// Update Trainer Password
router.put(
  "/trainer/update-password",
  verifyToken,
  authorize(["trainer"]),
  updateTrainerPassword
);

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