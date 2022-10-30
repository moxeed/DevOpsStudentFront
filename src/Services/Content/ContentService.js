import HttpEngine from "../Engines/CoreEngine";

const routes = {
  FreeCotents: "/FreeContent/GetFreeContents",
  FreeCotentId: "/FreeContent/GetFreeContent",
  FreeContentByFilterPost: "/FreeContent/GetFreeContentByFilter",
  FreeContentByProviderId: "/FreeContent/GetFreeContentByProviderId",
  FreeContentGetImportant: "FreeContent/GetImportant",
};

const ContentService = {
  GetFreeCotents: async () => {
    const { data } = await HttpEngine.Get(routes.FreeCotents);
    return data;
  },
  GetFreeContentGetImportant: async () => {
    const { data } = await HttpEngine.Get(routes.FreeContentGetImportant);
    return data;
  },
  GetFreeCotentsId: async (id) => {
    const { data } = await HttpEngine.Get(
      `/FreeContent/GetFreeContent?contentId=${id}`
    );
    return data;
  },
  GetFreeContentByFilter: (x) =>
    HttpEngine.Post(routes.FreeContentByFilterPost, x),
  GetCoursesByGroupId: (id) => {
    return HttpEngine.Get(`/BasicInfo/CoursesByGroupId?groupId=${id}`);
  },
  GetFreeContentByProviderId: (x) => {
    return HttpEngine.Get(
      `/FreeContent/GetFreeContentByProviderId?providerId=${x}`
    );
  },
};

export default ContentService;
