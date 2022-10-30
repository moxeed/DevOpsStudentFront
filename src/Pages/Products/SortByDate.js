export const SortByDate = async (products) => {
  const { data } = await products.then((res) => res);

  data.sort((a, b) => (a.webinarSchedules[0]?.startDateTime < b.webinarSchedules[0]?.startDateTime ? 1 : -1));

  return new Promise(function (resolve) {
    resolve({ data: data });
  });
};
