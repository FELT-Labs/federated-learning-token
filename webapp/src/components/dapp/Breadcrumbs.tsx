import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col } from 'reactstrap';

type linkType = {
  link: string;
  name: string;
};

type propTypes = {
  title: string;
  links?: Array<linkType>;
};

const Breadcrumbs: FC<propTypes> = ({ title, links = [] }) => {
  const allLinks = [
    {
      link: '/app',
      name: 'Application',
    },
  ].concat(links);

  return (
    <Col className="p-3 ps-4">
      <Breadcrumb listClassName="m-0">
        {allLinks.map(({ link, name }, idx) => {
          const active = allLinks.length === idx + 1;
          return (
            <BreadcrumbItem active={active}>
              {active ? <span>{name}</span> : <Link to={link}>{name}</Link>}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <h3>{title}</h3>
    </Col>
  );
};

export default Breadcrumbs;
