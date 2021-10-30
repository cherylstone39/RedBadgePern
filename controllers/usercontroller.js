const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User, RecipeModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const validateSession = require("../middleware/validate-session");
const router = Router();

// ======================
//    Register Account
// ======================
router.post("/register", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
    });
    let token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User successfully registered",
      user: newUser,
      sessionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else {
      res.status(500).json({ error: `Failed to register user: ${err}` });
    }
  }
});
/*Get user data association info*/

router.get("/userinfo", async (req, res) => {
  try {
    await models.User.findAll({
      include: [
        {
          model: models.RecipeModel,
          include: [
            {
              model: models.RatingsModel,
            },
          ],
        },
      ],
    }).then((users) => {
      res.status(200).json({
        users: users,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: `Failed to retrieve users: ${err}`,
    });
  }
});

/*
======================
      Login
======================
*/

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let loginUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
          user: loginUser,
          message: "Login Succesful!",
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect email or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect email or password",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Login Failed",
    });
  }
});





module.exports = router;
