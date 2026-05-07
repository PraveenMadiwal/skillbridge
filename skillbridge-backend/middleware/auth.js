const jwt = require("jsonwebtoken");
const pool = require("../db/db");

exports.verifyToken = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    console.log(
      "AUTH HEADER =>",
      authHeader
    );

    if (!authHeader) {

      return res.status(401).json({
        message: "No token provided",
      });

    }

    if (
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        message: "Invalid token format",
      });

    }

    const token =
      authHeader.split(" ")[1];

    console.log("TOKEN =>", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED =>", decoded);

    const userResult = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        role,
        institution_id
      FROM users
      WHERE id = $1
      `,
      [decoded.id]
    );

    if (
      userResult.rows.length === 0
    ) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    req.user = userResult.rows[0];

    console.log(
      "REQ USER =>",
      req.user
    );

    next();

  } catch (err) {

    console.log(
      "VERIFY TOKEN ERROR =>",
      err
    );

    return res.status(403).json({
      message: "Invalid token",
    });

  }

};