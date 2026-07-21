import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields")
    }
    // if(!isValidEmail(email)){
    //     res,status(400);
    //     throw new Error('Invalid email format');
    // }
    //  if(!isValidPassword(password)){
    //     res,status(400);
    //     throw new Error('Password must be at least 6 characters');
    // }

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('user already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } else {
        res.status(400);
        throw new Error('Invaild user data')
    }
    
}
