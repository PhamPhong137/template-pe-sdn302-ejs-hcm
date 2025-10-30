const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {
    // Render login page
    showLogin: (req, res) => {
        res.render('auth/login', { 
            title: 'Login',
            error: null,
            success: null 
        });
    },

    // Handle login form submission
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await db.User.findOne({ email });
            if (!user) {
                return res.render('auth/login', { 
                    title: 'Login',
                    error: "User not found",
                    success: null 
                });
            }

            const isPasswordValid = await bcryptjs.compare(password, user.password);

            if (!isPasswordValid) {
                return res.render('auth/login', { 
                    title: 'Login',
                    error: "Invalid password",
                    success: null 
                });
            }

            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });

            // Set token in cookie or session
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
            
            // Redirect to home page after successful login
            res.redirect('/');
        } catch (error) {
            res.render('auth/login', { 
                title: 'Login',
                error: error.message,
                success: null 
            });
        }
    },

    // Render register page
    showRegister: (req, res) => {
        res.render('auth/register', { 
            title: 'Register',
            error: null,
            success: null 
        });
    },

    // Handle register form submission
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            
            const user = await db.User.findOne({ email });
            if (user) {
                return res.render('auth/register', { 
                    title: 'Register',
                    error: "User already exists",
                    success: null 
                });
            }

            const hashedPassword = await bcryptjs.hash(password, 10);
            const newUser = new db.User({
                email,
                password: hashedPassword,
                name
            });

            await newUser.save();
            
            res.render('auth/login', { 
                title: 'Login',
                error: null,
                success: "Registration successful! Please login." 
            });
        } catch (error) {
            res.render('auth/register', { 
                title: 'Register',
                error: error.message,
                success: null 
            });
        }
    }
};