import { useLoaderData } from "react-router-dom";

import "./OrgMemberProfile.css";

import axios from "axios";

const OrgMemberProfile = () => {
  const member = useLoaderData();
  const { user } = member;

  // Sample Member Data
  const mockMemberProfileData = {
    _id: "6451498c23f7d433ec714074",
    parentOrg: "6451498c23f7d433ec714072",
    user: {
      _id: "6440197e35061f4acfde28bf",
      name: "Michael Fernandez",
      email: "test",
      createdAt: "2023-04-19T16:40:30.473Z",
      updatedAt: "2023-04-25T14:57:12.645Z",
      __v: 0,
      bio: "This is my new bio!",
    },
    permissions: "owner",
    title: "",
    about: "",
    __v: 0,
    id: "6451498c23f7d433ec714074",
  };

  return (
    <div className="member-profile-page">
      <div className="member-profile">
        <div className="page-title">Member Profile</div>
        <h1 className="member-name">{user.name}</h1>
        {/* <p>{member.permissions}</p> */}
        <p className="member-title">{member.title}</p>
        <div className="member-about">
          <div className="field-name">About</div> 
          {member.about}
        </div>
      </div>
    </div>
  );
};

export default OrgMemberProfile;


export const loader = async ({ params }) => {

  try {
    const {data} = await axios.get(
      `${process.env.REACT_APP_API_URL}/organizations/${params.orgId}/members/${params.memberId}`
    );
    return data.member

  } catch (error) {
    return console.log(error);
  }
};