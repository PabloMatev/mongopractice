const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const profile = require("../../models/profile");
const { check, validationResult } = require("express-validator/check");

// @route GET api/me
//@desc Test route
//@access Public

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await profile
      .findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
  } catch (err) {
    console.error(err.message);
    res.send(500).send("server Error");
  }
});
// @route Post api/me
//@desc Test route
//@access Public

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",".map((skill) => skill.trim()));
    }
    console.log(skills);
    res.send("hello");
  }
);

module.exports = router;
