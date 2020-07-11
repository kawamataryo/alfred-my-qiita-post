import alfy from "alfy"

export const fetchAllPosts = async (username, token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    json: true,
    maxAge: 60000
  };

  const user = await alfy.fetch(
    `https://qiita.com/api/v2/users/${username}`,
    options
  );

  const maxPage = Math.ceil(user.items_count / 100);

  let posts = [];
  await Promise.all(
    [...Array(maxPage)].map(async (_, i) => {
      const res = await alfy.fetch(
        `https://qiita.com/api/v2/authenticated_user/items?page=${
          i + 1
        }&per_page=100`,
        options
      );
      posts = [...posts, ...res];
    })
  );

  return posts
};
