const pool = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================

exports.signup = async (req, res) => {

  const {
    name,
    email,
    password,
    role
  } = req.body;

  try {

    const existingUser = await pool.query(
      `
      SELECT * FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (existingUser.rows.length > 0) {

      return res.status(400).json({
        message: "Email already exists",
      });

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const result = await pool.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        role
      )
      VALUES ($1,$2,$3,$4)
      RETURNING id,name,email,role
      `,
      [
        name,
        email,
        hashedPassword,
        role,
      ]
    );

    res.json({
      message: "Signup Successful",
      user: result.rows[0],
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }

};

// ================= LOGIN =================

exports.login = async (req, res) => {

  const {
    email,
    password
  } = req.body;

  try {

    const userResult = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (userResult.rows.length === 0) {

      return res.status(400).json({
        message: "Invalid Email",
      });

    }

    const user = userResult.rows[0];

    console.log("DB USER =>", user);

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("PASSWORD MATCH =>", isMatch);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("GENERATED TOKEN =>", token);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }

};

// ================= TRAINER PROFILE =================

exports.getTrainerProfile = async (
  req,
  res
) => {

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        created_at
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    const sessions = await pool.query(
      `
      SELECT COUNT(*)
      FROM sessions
      WHERE trainer_id = $1
      `,
      [req.user.id]
    );

    res.json({
      ...result.rows[0],
      totalSessions:
        sessions.rows[0].count,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ================= UPDATE TRAINER NAME =================

exports.updateTrainerName =
  async (req, res) => {

    const { name } = req.body;

    try {

      await pool.query(
        `
        UPDATE users
        SET name = $1
        WHERE id = $2
        `,
        [name, req.user.id]
      );

      res.json({
        message:
          "Trainer Name Updated",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Server Error",
      });

    }

  };

// ================= UPDATE TRAINER PASSWORD =================

exports.updateTrainerPassword =
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
          "Password Updated",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Server Error",
      });

    }

  };