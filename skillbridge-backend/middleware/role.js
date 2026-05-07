exports.authorize = (roles = []) => {

  return (req, res, next) => {

    console.log("USER ROLE =>", req.user.role);

    console.log("ALLOWED ROLES =>", roles);

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        message: "Access Denied",
      });

    }

    next();

  };

};