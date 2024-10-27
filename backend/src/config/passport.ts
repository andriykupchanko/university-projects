import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/User'; // Ваш імпорт моделі User

// Тип для callback 'done'
type DoneFunction = (error: any, user?: User | false, options?: any) => void;

// Стратегія локальної авторизації
passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
}, async (login: string, password: string, done: DoneFunction) => {
  try {
    const user = await User.findOne({ where: { login } }) as User; // Явне типізування
    if (!user) {
      return done(null, false, { message: 'Incorrect login.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Серіалізація користувача
passport.serializeUser((user: any, done: DoneFunction) => {
  done(null, user.id);
});


// Десеріалізація користувача
passport.deserializeUser(async (id: number, done: DoneFunction) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (error) {
    done(error);
  }
});

export default passport;
