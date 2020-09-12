import alfy from "alfy";
import { fetchAllPosts } from "./lib/fetchAllPosts";

const token = process.env.apiToken;
const username = process.env.username;

const createResponse = (title, subtitle, url) => {
  return {
    title,
    subtitle,
    arg: url,
    icon: {
      type: "png",
      path: "icon.png",
    }
  };
}

(async () => {
  const posts = await fetchAllPosts(username, token);
  if(alfy.input.length > 1) {
    const items = alfy.inputMatches(posts, "title").map(
        (p) => createResponse(p.title, p.body, p.url));

    if (!items.length) {
      alfy.output(
          [createResponse("The requested post was not found. ⚠️", "", "")]);
      return;
    }
    alfy.output(items);
  } else {
    alfy.output([createResponse("Loading...", "", "")])
  }
})()
