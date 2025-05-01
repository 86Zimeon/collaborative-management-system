const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: "",
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    contacts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        }
      }
    ],
    contactRequests: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending"
        },
        sentAt: {
          type: Date,
          default: Date.now,
        }
      }
    ],
    status: {
      type: String,
      enum: ["online", "offline", "away"],
      default: "offline",
    },
    socketId: {
      type: String,
      default: null,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "auto",
      },
      notifications: {
        desktop: {
          type: Boolean,
          default: true,
        },
        email: {
          type: Boolean,
          default: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient user lookup by email
userSchema.index({ email: 1 });

// Index for finding online users
userSchema.index({ status: 1 });

// Compound index for team membership queries
userSchema.index({ teams: 1, status: 1 });

// Instance method to check if user is member of a team
userSchema.methods.isMemberOfTeam = function (teamId) {
  return this.teams.includes(teamId);
};

// Static method to find online users in a team
userSchema.statics.findOnlineTeamMembers = async function (teamId) {
  return this.find({
    teams: teamId,
    status: "online",
  });
};

// Password validation middleware (pre-validate)
userSchema.pre('validate', function(next) {
  if (this.isModified('password')) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(this._doc.password)) {
      this.invalidate('password', 'Password must be at least 8 characters long and contain at least one letter and one number');
    }
  }
  next();
});

// Password hashing middleware (pre-save)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);
