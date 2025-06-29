export const fetchLink = async (link: string) => {
    const res = await fetch(link);
    return res.json();
  };