const pool = require("../db/db");
const bcrypt = require("bcryptjs");

// ================= GET PROFILE =================

exports.getStudentProfile = async (
  req,
  res
) => {

  try {

    // USER DETAILS
    const userResult = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    // ATTENDED CLASSES
    const attendedResult = await pool.query(
      `
      SELECT COUNT(*) AS attended
      FROM session_participants
      WHERE student_id = $1
      `,
      [req.user.id]
    );

    const user =
      userResult.rows[0];

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,

      attendedClasses:
        attendedResult.rows[0].attended,

      joinedDate:
        user.created_at,

      expiryDate:
        "2027-12-31",

      address:
        "Bangalore, Karnataka",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }

};

// ================= UPDATE NAME =================

exports.updateStudentName =
  async (req, res) => {

    const { name } = req.body;

    try {

      await pool.query(
        `
        UPDATE users
        SET name = $1
        WHERE id = $2
        `,
        [
          name,
          req.user.id,
        ]
      );

      res.json({
        message:
          "Name Updated Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message,
      });

    }

  };

// ================= UPDATE PASSWORD =================

exports.updateStudentPassword =
  async (req, res) => {

    const { password } = req.body;

    try {

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      await pool.query(
        `
        UPDATE users
        SET password = $1
        WHERE id = $2
        `,
        [
          hashedPassword,
          req.user.id,
        ]
      );

      res.json({
        message:
          "Password Updated Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message,
      });

    }

  };