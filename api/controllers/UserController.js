import User from '../models/UserModel';
import { sendConfirmationEmail } from '../mailer/mailer';
import parseErrors from '../utils/parseErrors';

exports.register_user = ((req, res) => {
    const { email, password, username } = req.body.user;
    const user = new User({ email, username });
    user.setPassword(password);
    user.setConfirmationToken();
    user
        .save()
        .then(userRecord => {
            sendConfirmationEmail(userRecord);
            res.json({ user: userRecord.toAuthJSON() });
        })
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

exports.current_user = ((req, res) => {
    res.json({
        user: {
            email: req.currentUser.email,
            confirmed: req.currentUser.confirmed,
            username: req.currentUser.username
        }
    });
});