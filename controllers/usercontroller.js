const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const { UniqueConstraintError} = require("sequelize/lib/errors")
const validateSession = require("../middleware/validate-session");
const router = Router();

// ======================
//    Register Account
// ======================
router.post("/register", validateSession, async function (req, res) {
  let {firstName, lastName, email, password } = req.body;
  try{ const User = await User.register({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 20),
  })
  let token = jwt.sign({id:User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60* 24});

  res.status(201).json({
    message: "User successfully registered",
    user: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcrypt.hashSync(password, 20),
      sessionToken: token
    }
});
  }catch(e){
    if(err instanceof UniqueConstraintError) {
      res.status(409).json ({
          message: "Email already in use",
      });
  }else {
    res.status(500).json({message:"Failed to create user",})
  }

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
      let loginUser = await UserModel.findOne({
          where: {
              email: email,
          },
      });

      if (loginUser) {
          let passwordComparison = await bcrypt.compare(password, loginUser.password);

          if (passwordComparison) {
              let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

              res.status(200).json({
                  user: loginUser,
                  message: "Login Succesful!",
                  sessionToken: token
              });
          } else {
              res.status(401).json({
                  message: "Incorrect email or password"
              });
          }
      } else {
          res.status(401).json({
              message: "Incorrect email or password"
          });
      }
  
  } catch (e) {
      res.status(500).json({
          message: "Login Failed"
      })
  }
});

module.exports = router;
