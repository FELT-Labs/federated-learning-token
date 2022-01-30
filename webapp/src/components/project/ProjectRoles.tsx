import { FC } from 'react';
import { constants } from 'ethers';

interface RoleBadgeProps {
    text: string;
    color: string;
}
const RoleBadge: FC<RoleBadgeProps> = ({ text, color }) => (
  <span style={{ backgroundColor: color, borderRadius: 12, padding: '8px 16px', margin: '4px 8px', color: 'white' }}>
    {text}
  </span>
);

interface ProjectRolesProps {
    builder: any
    nodeState: number | undefined;
}

const ProjectRoles: FC<ProjectRolesProps> = ({ builder, nodeState }) => {
  if (builder === undefined || nodeState === undefined) {
    return null;
  }

  /* eslint-disable-next-line no-underscore-dangle */
  if (builder._address === constants.AddressZero && nodeState === 0) {
    return (
      <p style={{ fontSize: 18 }}>
        Currently, you are not participating in this project.
      </p>
    );
  }

  return (
    <p style={{ fontSize: 18 }}>
      Your role:
      {/* eslint-disable-next-line no-underscore-dangle */}
      {builder._address !== constants.AddressZero && <RoleBadge text="Builder" color="#c9c54c" />}
      {nodeState === 1 && <RoleBadge text="⏱ Data Provider" color="#73b8e2" />}
      {nodeState === 2 && <RoleBadge text="⛔ Data Provider" color="#ce7440" />}
      {nodeState >= 3 && <RoleBadge text="Data Provider" color="#5cb758" />}
    </p>
  );
};

export default ProjectRoles;
