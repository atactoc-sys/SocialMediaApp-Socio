/**
 * The `verifyToken` function is a middleware function in JavaScript that verifies the authenticity of
 * a JSON Web Token (JWT) and attaches the decoded user information to the request object.
 * param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, query parameters, and request body. It is an object that is
 * automatically passed to the middleware function by the Express framework.
 * param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 * returns The code is returning a middleware function named `verifyToken`.
 */
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(403).send({ message: "Access Denied" });
        }

        token = token.replace("Bearer ", ""); // Remove "Bearer " prefix

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
