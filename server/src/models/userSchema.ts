import { Schema, model } from "mongoose";

const bcrypt = require("bcrypt");

interface IUser {
  username: string;
  email: string;
  password: string;
  methods: {
    comparePassword: (candidatePassword: string, cb: any) => void;
  };
}
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err: any, salt: any) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err: any, hash: any) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: any
) {
  // Compare the passed password with the hashed password stored in the database
  bcrypt.compare(
    candidatePassword,
    this.password,
    function (err: any, isMatch: any) {
      if (err) return cb(err);
      cb(null, isMatch);
    }
  );
};

const User = model<IUser>("User", userSchema);

export default User;
