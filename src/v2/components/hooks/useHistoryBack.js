const useHistoryBack = (history) => {
  if (history.length > 0) history.goBack();
  else history.push("/v2");
};

export default useHistoryBack;
