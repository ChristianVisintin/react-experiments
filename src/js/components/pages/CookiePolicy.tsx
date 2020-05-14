import React from 'react';
import { Container } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export default function CookiePolicy() {
  return (
    <Container fluid className="w-100">
      <h1><FormattedMessage id="cookies.policy.title" /></h1>
      <p><FormattedMessage id="cookies.policy.subtitle" /></p>
      <h2><FormattedMessage id="cookies.policy.whatTitle" /></h2>
      <p><FormattedMessage id="cookies.policy.whatBody" /></p>
      <p><FormattedMessage id="cookies.policy.whatFooter" /> <a href="https://www.cookieconsent.com/what-are-cookies/"><FormattedMessage id="cookies.policy.whatFooterLink" /></a></p>
      <h2><FormattedMessage id="cookies.policy.howTitle" /></h2>
      <p><FormattedMessage id="cookies.policy.howBody" /></p>
      <h2><FormattedMessage id="cookies.policy.disablingTitle" /></h2>
      <p><FormattedMessage id="cookies.policy.disablingBody" /></p>
      <h2><FormattedMessage id="cookies.policy.usedCookiesTitle" /></h2>
      <ul>
        <li>
          <p><FormattedMessage id="cookies.policy.usedCookiesList.preferences.title" /></p>
          <p><FormattedMessage id="cookies.policy.usedCookiesList.preferences.body" /></p>
        </li>
      </ul>
      <h2><FormattedMessage id="cookies.policy.thirdPartyTitle" /></h2>
      <p><FormattedMessage id="cookies.policy.thirdPartyBody" /></p>
      <ul>
        <li>
          <p><FormattedMessage id="cookies.policy.thirdPartyList.googleAnalytics.title" /></p>
          <p><FormattedMessage id="cookies.policy.thirdPartyList.googleAnalytics.body" /></p>
        </li>
      </ul>
      <h2><FormattedMessage id="cookies.policy.moreInformationTitle" /></h2>
      <p><FormattedMessage id="cookies.policy.moreInformationBody" /></p>
      <p><FormattedMessage id="cookies.policy.moreInformationContacts" /></p>
      <ul>
        <li>Email: christian.visintin@gmail.com</li>
      </ul>
    </Container>
  )
}
