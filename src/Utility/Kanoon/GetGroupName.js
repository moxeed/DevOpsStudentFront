import IdentityService from "../../Services/Identity/IdentityService"

export const GetGroupName = async (id) => {
    const data = await IdentityService.GroupId();
    const name = data.filter((item) => item.id === +id );
    return name[0]?.name;
}