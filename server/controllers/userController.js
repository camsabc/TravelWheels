const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;




/* This function retrieves all users in the database */
const getUsers = (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        });
};

/* This function retrieves one user using a unique id */
const getUserById = (req, res) => {
    const userId = req.params.id;

    UserModel.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch user' });
        });
};

/* This function creates a user to be stored in the database */
const newAccount = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.t_password, saltRounds);
        const newUser = { ...req.body, t_password: hashedPassword };
        const newAccount = await Travel.create(newUser);
        res.json({ newAccount, status: "successfully inserted" });
    } catch (err) {
        res.json({ message: 'Something went wrong', error: err });
    }
};

/* This function retrieves one user using unique id */
const editUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name, email, password },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

/* This function scans databse for matching email and password */
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        /* If the user is found and the password matches, return the user data */
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to sign in' });
    }
};

/* This function retrieves one user using a unique email */
const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};


module.exports = {
    getUsers,
    getUserById,
    /* createUser, */
    editUser,
    signIn,
    getUserByEmail,
    newAccount,
    
};
