import getConfig from "next/config";
import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/blogs`;

export const blogService = {
  postAll,
};
function postAll() {
  return fetchWrapper.post(baseUrl).then((item) => {
    return item;
  });
}
