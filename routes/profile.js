const express = require('express');
const router = express.Router();
//const mongoose = require ("mongoose");
const passport = require ("passport");
const validateProfileInput = require('../validation/profile')

//Load Profile model 
const Profile = require("../models/Profile");
//Load user model 
const User = require("../models/user");
const ImagePost = require('../models/ImagePost');

// @route   GET api/profile
// @desc    Get current users profile; check if user has profile or not 
// @access  Private
//default route
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate("user", ["name", "avatar"])
        .then((profile) => {
        if (!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile);
        })
        .catch((err) => res.status(404).json(err));
    }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
    const errors = {};

    Profile.find()
        .populate("user", ["name", "avatar"])
        .then((profiles) => {
        if (!profiles) {
            errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
        }
        res.json(profiles);
    })
    .catch((err) => res.status(404).json(err));
});


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
const errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate("user", ["name", "avatar"])
        .then((profile) => {
        if (!profile) {
            errors.noprofile = "There is no user id profile for this user";
            return res.status(404).json(errors);
        }

        res.json(profile);
        })
        .catch((err) =>
        res.status(404).json({ profile: "There is no profile for this user: userid failed" })
    );
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
const errors = {};

Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
    if (!profile) {
        errors.noprofile = "There is no handle for this user";
        return res.status(404).json(errors);
    }

    res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);
        // Check Validation
        if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.pronoun) profileFields.pronoun = req.body.pronoun;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.bio) profileFields.bio = req.body.bio;

        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

        Profile.findOne({ user: req.user.id }).then((profile) => {
        if (profile) {
            // Update
            Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
            ).then((profile) => res.json(profile));
        } else {
            // Check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then((profile) => {
            if (profile) {
                errors.handle = "That handle already exists";
                return res.status(400).json(errors);
            }
            // Save Profile
            new Profile(profileFields)
                .save()
                .then((profile) => res.json(profile));
            });
        }
    });
});
///////////////////////////////////////////////////////////////////////////////

// @route   POST route/image/post
// @desc    Add images to profile
// @access  Private
router.post("/upload", (req, res) => {
    const body = req.body;
    ImagePost.create(body, (err, data) => {
      if(err) {
        res.status(500).send('ERRROOO!', err);
      } else {
        res.status(201).send(data);
      }
    });
  });

// @route   DELETE api/profile/image/:image_id
// @desc    Delete education from profile
// @access  Private
router.delete(
"/image/:image_id",
    passport.authenticate("jwt", {session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
        .then((profile) => {
            // Get remove index
            const removeIndex = profile.image
            .map((item) => item.id)
            .indexOf(req.params.image_id);

            if (removeIndex === -1) {
            errors.imagenotfound = "Image not found";
            // Return any errors with 404 status
            return res.status(404).json(errors);
            }

            // Splice out of array
            profile.image.splice(removeIndex, 1);

            // Save
            profile.save().then((profile) => res.json(profile));
        })
        .catch((err) => res.status(404).json(err));
    }
    );

    // @route   DELETE api/profile
    // @desc    Delete user and profile
    // @access  Private
    router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
            res.json({ success: true })
        );
        });
    }
    );

module.exports = router;



