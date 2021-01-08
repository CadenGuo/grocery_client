import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

interface IGobackLinkProps {
  goBackTo: string;
  className: string;
}
export const GoBackLink: React.FC<IGobackLinkProps> = ({ goBackTo }: { goBackTo: string }) => (
  <div className="m-r-md">
    <Link to={goBackTo}>
      <LeftOutlined />
      &nbsp;
      Back
    </Link>
  </div>
);

export const generalPageHeaderStyle = {
  fontSize: '1.25rem',
  paddingBottom: '0.25rem',
  paddingLeft: '1rem',
  paddingRight: '1.5rem',
  marginBottom: '0.5rem',
};
const navAreaStyle = { fontSize: 13 };
const DEFAULT_BREADCRUMB_STYLE_MATCHING = { fontWeight: 'bold' } as const;
interface IPageHeaderProps {
  title?: React.ReactNode;
  breadCrumbs?: {
    name: string;
    link?: string;
  }[];
  goBackLink?: string;
  titleExtra?: React.ReactNode;
  navExtra?: React.ReactNode;
  style?: { [key: string]: any };
}
const PageHeader: React.FC<IPageHeaderProps> = ({
  breadCrumbs, title, titleExtra, goBackLink, navExtra, style,
}) => {
  return (
    <div style={{ ...generalPageHeaderStyle, ...style }}>
      <div className="m-b-sm flex-sp-between-justify-container" style={navAreaStyle}>
        <div className="flex-start-justify-container">
          {goBackLink && <GoBackLink goBackTo={goBackLink} className="m-r-sm" />}
          {breadCrumbs && <Breadcrumb separator=">">
            {breadCrumbs.map((breadCrumb, index, self) => {
              const breadCrumbItemstyle = index === self.length - 1 ? DEFAULT_BREADCRUMB_STYLE_MATCHING : undefined;
              const breadCrumbNameDisplay = <span style={breadCrumbItemstyle}>{breadCrumb.name}</span>;
              if (!breadCrumb.link) {
                return <Breadcrumb.Item key={breadCrumb.name}>{breadCrumbNameDisplay}</Breadcrumb.Item>;
              }
              return (
                <Breadcrumb.Item key={breadCrumb.name}>
                  <Link to={breadCrumb.link} style={{ color: '#47ACFE' }}>{breadCrumbNameDisplay}</Link>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>}
        </div>
        <div>
          {navExtra}
        </div>
      </div>
      <div className="flex-sp-between-justify-container">
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div>{titleExtra}</div>
      </div>
    </div>
  );
};

export default PageHeader;