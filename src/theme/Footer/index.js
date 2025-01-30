import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useThemeConfig } from "@docusaurus/theme-common";

export default function Footer() {
    const { footer } = useThemeConfig();
    if (!footer) {
        return null;
    }

    const { links, copyright } = footer;

    return (
        <footer className={'footer'}>
            <div className="container">
                <div className="row">
                    {links?.map((linkItem, i) => (
                        <div key={i} className="col col--4">
                            <div className='footer__title'>{linkItem.title}</div>
                            <ul className="footer__links">
                                {linkItem.items.map((item, key) => (
                                    <li key={key}>
                                        <div className="footer__item">
                                            <Link
                                                className="footer__link-item"
                                                to={useBaseUrl(item.href)}
                                                target={'_blank'}
                                                rel={item.rel || ""}
                                            >
                                                {item.label}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11"
                                                     viewBox="0 0 10 11" fill="none">
                                                    <path
                                                        d="M7.2998 2.79443H2.2998C1.9998 2.79443 1.7998 2.99443 1.7998 3.29443C1.7998 3.59443 1.9998 3.79443 2.2998 3.79443H6.0998L1.9498 7.94443C1.7498 8.14443 1.7498 8.44443 1.9498 8.64443C2.1498 8.84443 2.4498 8.84443 2.6498 8.64443L6.7998 4.49443V8.29443C6.7998 8.59443 6.9998 8.79443 7.2998 8.79443C7.5998 8.79443 7.7998 8.59443 7.7998 8.29443V3.29443C7.7998 2.99443 7.5998 2.79443 7.2998 2.79443Z"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="footer__bottom text--center">
                    <div>{copyright}</div>
                </div>
            </div>
        </footer>
    );
}