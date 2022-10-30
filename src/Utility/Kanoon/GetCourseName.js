import IdentityService from "../../Services/Identity/IdentityService"

export const GetCourseName = async (groupId, courseId) => {
    const data = await IdentityService.CourseId(groupId);
    const name = data.filter((item) => item.id === +courseId );
    return name[0]?.name;
}