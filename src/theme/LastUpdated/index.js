import React from 'react';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';

function getCurrentDate() {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(now);

  return {
    dateTime: now.toISOString(),
    formatted,
  };
}

export default function LastUpdated() {
  const currentDate = getCurrentDate();

  return (
    <span className={ThemeClassNames.common.lastUpdated}>
      <Translate
        id="theme.lastUpdated.lastUpdatedAtBy"
        description="The sentence used to display when a page has been last updated"
        values={{
          atDate: (
            <Translate
              id="theme.lastUpdated.atDate"
              description="The words used to describe on which date a page has been last updated"
              values={{
                date: (
                  <b>
                    <time dateTime={currentDate.dateTime}>
                      {currentDate.formatted}
                    </time>
                  </b>
                ),
              }}>
              {' on {date}'}
            </Translate>
          ),
          byUser: '',
        }}>
        {'Last updated{atDate}{byUser}'}
      </Translate>
    </span>
  );
}
