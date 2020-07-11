import alfy from "alfy";
import { fetchAllPosts } from "./lib/fetchAllPosts";

const token = process.env.API_TOKEN;
const username = process.env.USER_NAME;

const createItem = (title, subtitle, url) => {
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
  if(!token || !username) {
    alfy.output([createItem("Please set environment variable. ⚠️", "Set API_TOKEN and USER_NAME to workflow environment variable", "")])
  }

  const posts = await fetchAllPosts(username, token);

  if(alfy.input.length > 1) {
    const items = alfy.inputMatches(posts, "title").map(
        (p) => createItem(p.title, p.body, p.url));

    if (!items.length) {
      alfy.output(
          [createItem("The requested post was not found. ⚠️", "", "")]);
      return;
    }
    alfy.output(items);
  } else {
    alfy.output([createItem("Loading...", "", "")])
  }
})()
