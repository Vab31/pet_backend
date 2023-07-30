import express, { Request, Response } from 'express';
import Learn from '../models/learn'; 
import bcrypt from 'bcryptjs';
import User from '../models/auth'; 
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const myData = new Learn(req.body);
    await myData.save();
    res.send("item saved to database");
  } catch (err) {
    res.status(400).send("unable to save to database");
  }
});

// signup
router.post('/dashboard/addAdmin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword
    });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/dashboard/admin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    return res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/val', async (req: Request, res: Response) => {
  try {
    const data = await Learn.find();
    res.json(data);
  } catch (error) {
    const err = error as Error; // Type assertion
    res.status(500).send({ msg: 'could not get /', error: err.message, status: false });
  }
});

export default router;
