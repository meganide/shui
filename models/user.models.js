import { db } from "../server.js";

const createUser = async (userName, password, firstName, lastName) => {
  // Om vi ska kryptera.
  // const hashedPassword = await bcrypt.hash(password + process.env.BCRYPT_HASH, 10);

  try {
    const query = "SELECT * FROM User WHERE Username = ?";
    const rows = await db.all(query, [userName]);
    if (rows.length > 0) {
      return 409;
    }

    const insertQuery =
      "INSERT INTO User (Username, Password, FirstName, LastName) VALUES (?, ?, ?, ?)";
    await db.run(insertQuery, [userName, password, firstName, lastName]);

    // Går detta att lösa på ett bättre sätt ? Hämta från db.run över istället för att köra login funktionen igen ?
    const userResult = await login(userName, password);
    return userResult;
  } catch (err) {
    console.error(err);
    if (err.errno === 19) return 400;
  }
};

const login = async (username, password) => {
  try {
    const query = "SELECT * FROM User WHERE Username = ?";
    const rows = await db.all(query, [username]);

    if (rows.length === 0) {
      return 401;
    }
    const user = rows[0];

    // Om vi ska kryptera.
    // const isPasswordCorrect = await bcrypt.compare(password + process.env.BCRYPT_HASH, user.Password);
    const isPasswordCorrect = (await user.Password) === password;

    if (!isPasswordCorrect) {
      return 401;
    }

    return user;
  } catch (err) {
    console.error(err);
  }
};

const checkIfUserExists = async (id) => {
  const query = "SELECT * FROM User WHERE id = ?";
  const params = [id];

  try {
    const row = await db.get(query, params);
    return row || null;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { createUser, login, checkIfUserExists };
