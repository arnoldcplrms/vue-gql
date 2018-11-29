const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn })
}

module.exports = {
    Query: {
        getCurrentUser: async(_, args, { User, currentUser }) => {
            if (!currentUser) return null;
            return await User.findOne({ username: currentUser.username })
                .populate({
                    path: 'favorites',
                    model: 'Post'
                });
        },
        getPosts: async(_, args, { Post }) => {
            return await Post.find({})
                .sort({ createdDate: 'desc' })
                .populate({ path: 'createdBy', model: 'User' })
        }
    },
    Mutation: {
        addPost: async(_, { title, imageUrl, categories, description, creatorId }, { Post }) => {
            return await new Post({
                title,
                imageUrl,
                categories,
                description,
                createdBy: creatorId
            }).save();
        },
        signinUser: async(_, { username, password }, { User }) => {
            try {
                const user = await User.findOne({ username });
                if (!user) throw new Error('User not found');
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) throw new Error('Invalid Password');
                return { token: createToken(user, process.env.SECRET, '1hr') };
            } catch (error) {
                throw new Error(error.message)
            }
        },
        signupUser: async(_, { username, email, password }, { User }) => {
            try {
                const user = await User.findOne({ username });
                if (user) throw new Error("User already exist");
                const newUser = await new User({
                    username,
                    email,
                    password
                }).save();
                return { token: createToken(newUser, process.env.SECRET, '1hr') };
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
}