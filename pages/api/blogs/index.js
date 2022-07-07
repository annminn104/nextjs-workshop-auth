import { apiHandler } from "helpers/api";

const data = require("data/data.json");

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "POST":
      return getBlogs();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getBlogs() {
    const response = data.blogs.map((blog) => {
      return blog;
    });
    return res.status(200).json(response);
  }
}
