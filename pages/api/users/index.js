import { apiHandler } from "helpers/api";

const data = require("data/data.json");

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getUsers();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getUsers() {
    // return users without passwords in the response
    const response = data.users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return res.status(200).json(response);
  }
}
