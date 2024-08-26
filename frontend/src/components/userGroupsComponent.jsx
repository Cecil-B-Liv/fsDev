import React from 'react';
import GroupCard from './groupCardComponent';

const UserGroupsComponent = ({ groups }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Joined Groups</h2>
      <hr />
      <div className="row">
        {groups.map((group) => (
          <div key={group.groupId} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <GroupCard
              groupId={group.groupId}
              groupName={group.groupName}
              groupDescription={group.groupDescription}
              groupAvatar={group.groupAvatar}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGroupsComponent;
