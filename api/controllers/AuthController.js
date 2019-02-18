import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { sendResetPasswordEmail } from '../mailer/mailer';

exports.user_authentication = ((req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email }).then(user => {
        if (user && user.isValidPassword(credentials.password)) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({ errors: { global: "Invalid credentials" } });
        }
    }).catch(e=>{
        res.status(500).json({ errors: { global: e.message } });
    });
});

exports.confirmation = ((req, res) => {
    const token = req.body.token;
    User.findOneAndUpdate(
        { confirmationToken: token },
        { confirmationToken: "", confirmed: true },
        { new: true }
    ).then(
        user =>
            user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
    );
});

exports.reset_password_request = ((req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            sendResetPasswordEmail(user);
            res.json({});
        } else {
            res
                .status(400)
                .json({ errors: { global: "There is no user with such email" } });
        }
    });
});

exports.validate_token = ((req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
        if (err) {
            res.status(401).json({});
        } else {
            res.json({});
        }
    });
});


exports.reset_password = ((req, res) => {
    const { password, token } = req.body.data;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ errors: { global: "Invalid token" } });
        } else {
            User.findOne({ _id: decoded._id }).then(user => {
                if (user) {
                    user.setPassword(password);
                    user.save().then(() => res.json({}));
                } else {
                    res.status(404).json({ errors: { global: "Invalid token" } });
                }
            });
        }
    });
});
