const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const productSchema = mongoose.Schema({
  name: {
      type: String,
      trim: true,
      required: true,
  },
  price: {
      type: Number,
      required: true,
  },
  description: {
      type: String,
      required: true,
  },
  image_link: {
      type: Array,
  },
  review: {
      type: Array,
  },
});

//save 메소드 실행 전 비밀번호를 암호화하는 로직
userSchema.pre('save', function (next) {
  let user = this;

  //model 안의 paswsword가 변환될 때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  //plainPassword를 암호화해서 현재 비밀번호와 비교
  return bcrypt.compare(plainPassword, this.password)
    .then((isMatch) => isMatch)
    .catch((err) => err);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(this._id.toHexString(), "secretToken");
  this.token = token;
  return this.save().then((user) => user)
    .catch((err) => err);
};

userSchema.statics.findByToken = function (token) {
  let user = this;
  //secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해
  //DB에 접근해서 유저의 정보를 가져온다
  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user.findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};

productSchema.pre('save', function (next) {
    const user = this.user;
    if (user != "admin") {
        const err = new Error('Not an admin');
        next(err);
    } else next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
