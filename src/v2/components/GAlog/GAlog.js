export const GApushData = (event, data) => {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "app.bamis.ir"
  )
    return;
  window.dataLayer = window?.dataLayer || [];
  window?.dataLayer.push({
    event: event,
    ...data,
  });
};
