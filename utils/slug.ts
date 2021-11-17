export const getSlug = (title: string, id: string | number) => {
  const parsedTitle = title.split(" ").join("-");
  return `${parsedTitle}-${id}`;
};
