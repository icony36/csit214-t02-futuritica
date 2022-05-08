const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Room = require("./room");

const userSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['staff', 'student', 'admin'],
        required: true,
    },
    username: {
        type: String,
        required: true,
        default: "Anonymous"
    },
    bookedRooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }],
    logInTime: {
        type: Date
    },
    logOutTime: {
        type: Date
    }
})

// hook to hash password before storing and changing role
userSchema.pre("save", async function(next){
    try{
        if(this.isModified("password")){
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            
            return next();
        }

        if(this.isModified("role")){
            this.bookedRooms = [];
            
            // update room bookedBy and availabilitiy
            await Room.updateMany({bookedBy: this.id}, {$set:{ availability: "public", bookedBy: null}});

            return next();   
        }

        return next();
    } catch(err){
        return next(err);
    }
});

// function to check if password is correct
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);

        return isMatch;
    } catch(err){
        return next(err);
    }
}

// hook to delete user
userSchema.pre("remove", async function(next){
    try{
        // update room bookedBy and availabilitiy
        await Room.updateMany({bookedBy: this.id}, {$set:{ availability: "public", bookedBy: null}});

        return next();
    } catch(err){
        return next(err);
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;