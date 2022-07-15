import { useState, useEffect } from "react";

import { userService, blogService } from "services";
import Image from "next/image";

export default function Home() {
  const [users, setUsers] = useState(null);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    userService.getAll().then((v) => setUsers(v));

    blogService.postAll().then((v) => setBlogs(v));
  }, []);

  return (
    <div className="card mt-4">
      <h4 className="card-header">NEXTJS</h4>
      <div className="card-body">
        <h6>Result</h6>
        {users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        )}
        {!users && <div className="spinner-border spinner-border-sm"></div>}
        <h6>BLogs</h6>
        {blogs && (
          <div className="row">
            {blogs.data.map((blog) => (
              <div key={blog.id} className="col">
                <div className="card">
                  <Image src={blog.image} className="card-img-top" width="334px" height="300px" alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.description}</p>
                    <a href="#" className="btn btn-primary">
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!blogs && <div className="spinner-border spinner-border-sm"></div>}
      </div>
    </div>
  );
}
