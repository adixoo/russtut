async function getUrls(): Promise<
  Record<string, { rank: number; chapter: string; content: string }>
> {
  let data: any;

  try {
    const url = `https://api.github.com/repos/adixoo/rust-for-beginners/contents/content?ref=main`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN!}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "force-cache",
    });
    data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

  // Transform the data into the desired format
  const result: Record<
    string,
    { rank: number; chapter: string; content: string }
  > = {};
  data.forEach(
    ({ name, download_url }: { name: string; download_url: string }) => {
      let key = name.replace(".md", "");
      let [chapterNumberRaw, ...chapterTitle] = key.split(" ");
      let chapterNumber = parseInt(chapterNumberRaw.split("-")[1]);
      let chapterName = chapterTitle.join(" ");
      result[chapterName.toLowerCase().replace(/\s+/g, "-")] = {
        rank: chapterNumber,
        chapter: chapterName,
        content: download_url,
      };
    },
  );

  return result;
}

export const urls = await getUrls();
