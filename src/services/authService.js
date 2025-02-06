import User from "../models/User.js";


export const register = async (userData)=> {
    if(userData.password !== userData.confirmPassword){
        throw new Error("Password missmatch!");
        
    }

    const user = await User.findOne({ email: userData.email }).select({_id: true});
    console.log(user)
    if(user){
        throw new Error('User already exists')
    };
   
    return User.create(userData)
};


const authService = {
    register
};

export default authService;