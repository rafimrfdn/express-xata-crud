const User = require('../models/user');
const xataService = require('../services/xataService'); // Assuming xataService exists

exports.createUser = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const user = new User(nama, email, password);

    const response = await xataService.insertUser(user);
    if (response.ok) {
      res.json({ message: 'User created successfully!', userId: response.id });
    } else {
      console.error('Error creating user:', await response.json());
      res.status(response.status).json({ message: 'An error occurred.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await xataService.fetchAllUsers();
    // console.log('users:', users); // Log the users data
    return res.render('userAll', { users });
    //return res.send('userAll', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).render('error', { message: 'Internal server error.' });
  }
};


exports.getUserForUpdate = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await xataService.fetchUserById(id); // Use getUserById function
    if (user) {
      res.render('update-user', { user }); // Render update-user.ejs with user data
    } else {
      res.status(404).render('error', { message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).render('error', { message: 'Internal server error.' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from URL params
    const { nama, email } = req.body;
    const updateData = { nama, email };

    const response = await xataService.updateExistingUser(id, updateData);
    if (response.ok) {
      // res.redirect(`/users/users/${id}`);
      res.send(`data dengan id ${id} berhasil update dengan nama: ${nama} dan email: ${email}`)
    } else {
      console.error('Error updating user:', await response.text());
      res.status(response.status).json({ message: 'An error occurred.' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await xataService.removeUser(id);
    if (response.ok) {
      //res.json({ message: 'User deleted successfully!' });
      res.json();
    } else {
      console.error('Error deleting user:', await response.json());
      res.status(response.status).json({ message: 'An error occurred.' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


