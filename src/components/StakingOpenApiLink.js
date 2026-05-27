import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const StakingOpenApiLink = () => {
  const {
    siteConfig: {customFields},
  } = useDocusaurusContext();
  const stakingApiOpenApiUrl = customFields.stakingApiOpenApiUrl;

  return (
    <a href={stakingApiOpenApiUrl} target="_blank" rel="noopener noreferrer">
      Staking OpenAPI schema
    </a>
  );
};

export default StakingOpenApiLink;
