import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        verified: {
            type: Boolean,
            default: false, //verification k bina no access to platform applications
        },
    },
    { timestamps: true }
);
//to enhance security:
//password enter krte hi pre('save') will run automatically to hash them
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return ; //password change hua toh return vrna hash it again
    this.password = await bcrypt.hash(this.password, 10);
});
//used to compare hashed and this.password
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


//poore schema mai agar kahi se bhi user k data ko read kroge : const user= await userModel.findOne({email:'test@test.com}) , is user k pass user.comparePassword method ka access aa jayega
//ie , method provides access to itself throughout the code
//userSchema.methods.comparePassword:

const userModel = mongoose.model('User', userSchema);

export default userModel;