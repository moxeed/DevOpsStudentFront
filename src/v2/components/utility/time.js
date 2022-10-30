const getIranDateTime = async () => {
  const concurrency = sessionStorage.getItem("correct-time");
  if (concurrency === "true") return new Date();
  const data = await fetch(window.config.Front_Panel + "time", {
    method: "POST",
  }).catch(console.log);
  const text = await data.text();
  return text ? new Date(text) : new Date();
};

const getDiffDateTime = async (date) => {
  const concurrency = sessionStorage.getItem("correct-time");
  if (concurrency === "true")
    return new Date(date).getTime() - new Date().getTime();
  const data = await fetch(window.config.Front_Panel + "time", {
    method: "POST",
  })
    .then((res) => res.text())
    .then((time) => new Date(date).getTime() - new Date(time).getTime())
    .catch(console.log);
  return data ?? 0;
};

const isTimeCorrect = async () => {
  const data = await fetch(window.config.Front_Panel + "time", {
    method: "POST",
  })
    .then((res) => res.text())
    .then((time) => {
      return Math.abs(new Date().getTime() - new Date(time).getTime()) < 1000;
    })
    .catch(console.log);
  return data ?? false;
};

export { getDiffDateTime, getIranDateTime, isTimeCorrect };
