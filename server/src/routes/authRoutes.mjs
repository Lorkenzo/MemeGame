
import {check, validationResult} from 'express-validator';
import express from 'express';
import {isLoggedIn} from "./auth.mjs"
import passport from 'passport';

/* ROUTE */
const authRoutes = express.Router();
//auth routes
authRoutes.post("/", function(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});

// GET /api/sessions/current -- NEW
authRoutes.get('/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current -- NEW
authRoutes.delete('/current', isLoggedIn,
   (req, res) => {
  req.logout(() => {
    res.end();
  });
});

export default authRoutes;

