/**
 * The above code is a JavaScript module that exports functions for reading and updating user data,
 * including getting a user by ID, getting a user's friends, and adding or removing a friend from a
 * user's friend list.
 * param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request headers, request body, request parameters, etc. It is
 * used to retrieve data from the client and pass it to the server.
 * param res - The `res` parameter is the response object that is used to send the HTTP response back
 * to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body.
 * param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used for error handling or to move on to the
 * next middleware function in the chain.
 */
import User from "../models/User.js";

/* read */

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId)) // Use `user.friends` instead of `User.friends`
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* update */

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params; // Use `req.params` instead of `res.params`
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) { // Use `user.friends` instead of `user.friend`
      user.friends = user.friends.filter((userId) => userId !== friendId); // Use `userId` instead of `id`
      friend.friends = friend.friends.filter((userId) => userId !== id); // Use `userId` instead of `id`
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId)) // Use `user.friends` instead of `User.friends`
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
