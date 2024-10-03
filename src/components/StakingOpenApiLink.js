import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const StakingOpenApiLink = () => {
  const { siteConfig } = useDocusaurusContext();
  const stakingApiUrl = siteConfig.customFields.stakingApiUrl;

  return (
    <a href={stakingApiUrl} target="_blank" rel="noopener noreferrer">
      Staking OpenApi
    </a>
  );
};

export default StakingOpenApiLink;
