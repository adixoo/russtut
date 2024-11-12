interface Root {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: Links;
}

export interface Links {
  self: string;
  git: string;
  html: string;
}

async function getUrls(): Promise<
  Record<string, { rank: number; chapter: string; content: string }>
> {
  let data: Root[];

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
    //@ts-ignore
    if (data.message) {
      //@ts-ignore
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
      const key = name.replace(".md", "");
      const [chapterNumberRaw, ...chapterTitle] = key.split(" ");
      const chapterNumber = parseInt(chapterNumberRaw.split("-")[1]);
      const chapterName = chapterTitle.join(" ");
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
