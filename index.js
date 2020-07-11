const alfy = require("alfy");

const options = {
  headers: {
    Authorization: `Bearer ${process.env.apiToken}`,
  },
};

const user = await alfy.fetch(
  `https://qiita.com/api/v2/users/${process.env.username}`,
  options
);
const maxPage = Math.ceil(user.items_count / 100);

let data = [];
await Promise.all(
  [...Array(maxPage)].map(async (_, i) => {
    res = await alfy.fetch(
      `https://qiita.com/api/v2/authenticated_user/items?page=${i + 1}&per_page=100`,
      options
    );
    data.push(...res);
  })
);

const items = alfy.inputMatches(data, "title").map((element) => ({
  title: element.title,
	arg: element.url,
	icon: {
		type: "png",
		path: "icon.png"
	}
}));

alfy.output(items);