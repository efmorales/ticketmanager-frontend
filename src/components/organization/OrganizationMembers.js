const OrganizationMembers = () => {
  const styles = {
    padding: "1em 4em",
  };
  return (
    <div className="members-page" style={styles}>
      <h1>These are our members!</h1>
      <p>List of members will be displayed here</p> <br />
      <p>To-do functionalities: </p>
      <ul>
        <li>Find Member</li>
        <li>Add Member</li>
        <li>Remove Member</li>
        <li>Change Member Permissions</li>
      </ul>
    </div>
  );
};

export default OrganizationMembers;
