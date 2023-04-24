import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../auth/api";

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState({ name: false, description: false, members: false });
  const [editedData, setEditedData] = useState({ name: "", description: "", members: [] });
  const [memberData, setMemberData] = useState([]);


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        });
        setProject(data);
        setEditedData({ name: data.name, description: data.description, members: data.members });
        const fetchMemberData = async (memberIds) => {
            const memberPromises = memberIds.map(async (id) => {
              const { data } = await api.get(`/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}}` },
              });
              return data;
            });
          
            const memberData = await Promise.all(memberPromises);
            setMemberData(memberData);
          };
        fetchMemberData(data.members);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };


    fetchProject();
  }, [projectId]);

  const handleEdit = (field) => {
    setEditing({ ...editing, [field]: true });
  };

  const handleSave = async (field) => {
    try {
      const { data } = await api.put(`/projects/${projectId}`, { [field]: editedData[field] }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });
      setProject(data);
      setEditing({ ...editing, [field]: false });
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleCancel = (field) => {
    setEditedData({ ...editedData, [field]: project[field] });
    setEditing({ ...editing, [field]: false });
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {editing.name ? (
        <>
          <input
            type="text"
            value={editedData.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          />
          <button onClick={() => handleSave("name")}>Save</button>
          <button onClick={() => handleCancel("name")}>Cancel</button>
        </>
      ) : (
        <>
          <h1>{project.name}</h1>
          <button onClick={() => handleEdit("name")}>Edit</button>
        </>
      )}

      <h3>Members</h3>
      <ul>
        {memberData.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>

      {editing.description ? (
        <>
          <textarea
            value={editedData.description}
            onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
          ></textarea>
          <button onClick={() => handleSave("description")}>Save</button>
          <button onClick={() => handleCancel("description")}>Cancel</button>
        </>
      ) : (
        <>
          <h3>Description</h3>
          <p>{project.description}</p>
          <button onClick={() => handleEdit("description")}>Edit</button>
        </>
      )}

      <h3>Related Ticket Issues</h3>
      {/* Render related ticket issues here */}
    </div>
  );
};

export default ProjectDetails;
