import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});



//                         important notes
/*process.env.PORT: process.env is a global object in Node.js that
 provides access to environment variables. 
process.env.PORT retrieves the value of the PORT environment variable,
 which specifies the port number on which the server should listen.8*/


