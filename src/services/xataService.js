require('dotenv').config();



async function insertUser(user) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  const response = await fetch(`${process.env.XATA_DATABASE_URL}/data?columns=id`, options);
  return response;
}


async function fetchAllUsers() { // Changed name to plural for consistency
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      columns: ["nama", "email", "password"],
      page: { size: 15 }
    })
  };

  try {
    const response = await fetch(`${process.env.XATA_DATABASE_URL}/query`, options);
    if (!response.ok) {
      throw new Error(`Failed to get users: ${await response.text()}`); // Throw an error with details
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error for handling in the controller
  }
}

async function fetchUserById(id) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

    const response = await fetch(`${process.env.XATA_DATABASE_URL}/data/${id}`, options);
  if (!response.ok) {
    throw new Error(`Failed to get user: ${await response.text()}`);
  }
  return response.json();
}


async function updateExistingUser(id, updateData) {
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${process.env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  };

    const response = await fetch(`${process.env.XATA_DATABASE_URL}/data/${id}?columns=id`, options);
  return response;
}


async function removeUser(id) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

    const response = await fetch(`${process.env.XATA_DATABASE_URL}/data/${id}?columns=id`, options);
  return response;
}

module.exports.insertUser = insertUser;
module.exports.fetchAllUsers = fetchAllUsers;
module.exports.fetchUserById = fetchUserById;
module.exports.updateExistingUser = updateExistingUser;
module.exports.removeUser = removeUser;
