const pool = require("../db/db");

// ================= CREATE SESSION =================

exports.createSession = async (req, res) => {

  const {
    batch_id,
    title,
    date,
    start_time,
    end_time
  } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO sessions
      (
        batch_id,
        trainer_id,
        title,
        date,
        start_time,
        end_time
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        batch_id,
        req.user.id,
        title,
        date,
        start_time,
        end_time
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
};

// ================= ALL SESSIONS =================

exports.getAllSessions = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        s.*,
        b.name AS batch_name,
        u.name AS trainer_name

      FROM sessions s

      LEFT JOIN batches b
      ON s.batch_id = b.id

      LEFT JOIN users u
      ON s.trainer_id = u.id

      ORDER BY s.date DESC
      `
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
};

// ================= JOIN SESSION =================

exports.joinSession = async (req, res) => {

  const { sessionId } = req.body;

  try {

    const existing = await pool.query(
      `
      SELECT *
      FROM session_participants
      WHERE session_id = $1
      AND student_id = $2
      `,
      [sessionId, req.user.id]
    );

    if (existing.rows.length > 0) {

      return res.status(400).json({
        message: "Already Joined Session"
      });

    }

    await pool.query(
      `
      INSERT INTO session_participants
      (
        session_id,
        student_id
      )
      VALUES ($1,$2)
      `,
      [sessionId, req.user.id]
    );

    res.json({
      message: "Session Joined Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
};

// ================= SESSION DETAILS =================

exports.getSessionDetails = async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(
      `
      SELECT
        s.*,
        b.name AS batch_name,
        u.name AS trainer_name

      FROM sessions s

      LEFT JOIN batches b
      ON s.batch_id = b.id

      LEFT JOIN users u
      ON s.trainer_id = u.id

      WHERE s.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        message: "Session Not Found"
      });

    }

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
};

// ================= STUDENT SESSIONS =================

exports.getMySessions = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.title,
        s.date,
        s.start_time,
        s.end_time,

        b.name AS batch_name,

        u.name AS trainer_name

      FROM session_participants sp

      JOIN sessions s
      ON sp.session_id = s.id

      LEFT JOIN batches b
      ON s.batch_id = b.id

      LEFT JOIN users u
      ON s.trainer_id = u.id

      WHERE sp.student_id = $1

      ORDER BY s.date DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
};

// ================= TRAINER SESSIONS =================

exports.getTrainerSessions = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        s.*,
        b.name AS batch_name

      FROM sessions s

      LEFT JOIN batches b
      ON s.batch_id = b.id

      WHERE s.trainer_id = $1

      ORDER BY s.date DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
};

// ================= SESSION STUDENTS =================

exports.getSessionStudents = async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.name,
        u.email

      FROM session_participants sp

      JOIN users u
      ON sp.student_id = u.id

      WHERE sp.session_id = $1
      `,
      [id]
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
};