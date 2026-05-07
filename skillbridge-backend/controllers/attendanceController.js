const pool = require("../db/db");

// ================= MARK ATTENDANCE =================
exports.markAttendance = async (req, res) => {

  const {
    session_id,
    status,
  } = req.body;

  try {

    const session = await pool.query(
      `
      SELECT batch_id
      FROM sessions
      WHERE id=$1
      `,
      [session_id]
    );

    if (session.rows.length === 0) {

      return res.status(404).json({
        message: "Session not found",
      });

    }

    const batchId = session.rows[0].batch_id;

    const studentCheck = await pool.query(
      `
      SELECT *
      FROM batch_students
      WHERE batch_id=$1
      AND student_id=$2
      `,
      [
        batchId,
        req.user.id,
      ]
    );

    if (studentCheck.rows.length === 0) {

      return res.status(403).json({
        message: "Not part of this batch",
      });

    }

    const result = await pool.query(
      `
      INSERT INTO attendance
      (session_id, student_id, status)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [
        session_id,
        req.user.id,
        status,
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }
};

// ================= SESSION ATTENDANCE =================
exports.getSessionAttendance = async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(
      `
      SELECT
      u.name,
      u.email,
      a.status,
      a.marked_at

      FROM attendance a

      JOIN users u
      ON a.student_id = u.id

      WHERE a.session_id = $1
      `,
      [id]
    );

    res.json(result.rows);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};