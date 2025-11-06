import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Component that displays the APP_URL from environment variables as a clickable link.
 * Usage in MDX: 
 *   <AppUrl /> - renders as a link to the base URL
 *   <AppUrl path="/staking-api" /> - renders as a link to the URL with additional path
 *   <AppUrl path="/staking-api">Dashboard</AppUrl> - custom link text
 */
const AppUrl = ({path = '', children}) => {
  const {
    siteConfig: {customFields},
  } = useDocusaurusContext();
  const appUrl = customFields.appUrl || 'APP_URL';
  const fullUrl = path ? `${appUrl}${path}` : appUrl;
  const linkText = children || fullUrl;

  return (
    <a href={fullUrl} target="_blank" rel="noopener noreferrer">
      {linkText}
    </a>
  );
};

export default AppUrl;

