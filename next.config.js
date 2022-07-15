module.exports = {
  serverRuntimeConfig: {
    secret: "NEXTJS WORKSHOP TEAM 3",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "https://nextjs-workshop-api-team3.vercel.app/api", // production api
  },
  images: {
    loader: "imgix",
    path: "",
  },
};
