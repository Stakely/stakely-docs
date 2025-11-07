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
  const appUrl = customFields.appUrl;

  if (!appUrl) {
    console.error('APP_URL is not set in environment variables');
    return <span>APP_URL</span>;
  }

  // Ensure the URL is absolute (starts with http:// or https://)
  const baseUrl = appUrl.startsWith('http://') || appUrl.startsWith('https://')
    ? appUrl
    : `https://${appUrl}`;

  // Remove trailing slash from baseUrl if present, then add path
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const fullUrl = path ? `${cleanBaseUrl}${path}` : cleanBaseUrl;
  const linkText = children || fullUrl;

  return (
    <a href={fullUrl} target="_blank" rel="noopener noreferrer">
      {linkText}
    </a>
  );
};

export default AppUrl;

