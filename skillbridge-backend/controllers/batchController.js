const pool = require("../db/db");

// ================= CREATE BATCH =================
exports.createBatch = async (req, res) => {

  const { name } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO batches
      (name, institution_id)
      VALUES ($1,$2)
      RETURNING *
      `,
      [
        name,
        req.user.institution_id || null,
      ]
    );

    // Add trainer automatically
    await pool.query(
      `
      INSERT INTO batch_trainers
      (batch_id, trainer_id)
      VALUES ($1,$2)
      `,
      [
        result.rows[0].id,
        req.user.id,
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// ================= JOIN BATCH =================
exports.joinBatch = async (req, res) => {

  const { batchId } = req.body;

  try {

    await pool.query(
      `
      INSERT INTO batch_students
      (batch_id, student_id)
      VALUES ($1,$2)
      `,
      [
        batchId,
        req.user.id,
      ]
    );

    res.json({
      message: "Joined batch successfully",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// ================= INVITE =================
exports.generateInvite = async (req, res) => {

  const { id } = req.params;

  res.json({
    inviteLink: `http://localhost:5173/join/${id}`,
  });
};

// ================= INSTITUTION STATS =================
exports.getInstitutionStats = async (req, res) => {

  try {

    const trainers = await pool.query(
      `
      SELECT COUNT(*) FROM users
      WHERE role='trainer'
      `
    );

    const students = await pool.query(
      `
      SELECT COUNT(*) FROM users
      WHERE role='student'
      `
    );

    const batches = await pool.query(
      `
      SELECT COUNT(*) FROM batches
      `
    );

    res.json({
      trainers: trainers.rows[0].count,
      students: students.rows[0].count,
      batches: batches.rows[0].count,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};