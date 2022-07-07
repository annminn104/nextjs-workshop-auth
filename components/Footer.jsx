import { useState, useEffect } from "react";

import { userService } from "services";

const Footer = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  if (!user) return null;

  return <div className="app-footer">Nextjs - Workshop AMITGROUP - Team 3 - 2022</div>;
};
export { Footer };
