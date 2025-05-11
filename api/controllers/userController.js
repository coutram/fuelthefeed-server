import User from '../models/user.js';

export const registerUser = async (req, reply) => {
  const { email, walletId, firstName, lastName } = req.body;

  try {
    const newUser = new User({ email, walletId, firstName, lastName });
    await newUser.save();
    reply.status(201).send({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error:', error);
    reply.status(400).send({ error: error.message });
  }
};

export const getUserByEmail = async (req, reply) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return reply.status(200).send({ });
    }
    reply.send(user);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

export const getUserByWalletId = async (req, reply) => {
  const { walletId } = req.params;

  try {
    const user = await User.findOne({ walletId });
    if (!user) {
      return reply.status(200).send({  });
    }
    reply.send(user);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

// You can add more controller functions as needed
