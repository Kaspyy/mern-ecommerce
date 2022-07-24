import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

/**
 * @desc authenticate user & get token
 * @route GET /api/users/login
 * @access public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

export { authUser };
