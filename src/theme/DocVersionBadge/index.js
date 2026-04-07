import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDocsVersion} from '@docusaurus/theme-common/internal';

function getBadgeLabel(versionLabel) {
  if (/latest/i.test(versionLabel)) {
    return 'Latest';
  }
  return versionLabel;
}

export default function DocVersionBadge({className}) {
  const versionMetadata = useDocsVersion();

  if (!versionMetadata.badge) {
    return null;
  }

  return (
    <span
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBadge,
        'badge badge--secondary',
      )}>
      <Translate
        id="theme.docs.versionBadge.label"
        values={{versionLabel: getBadgeLabel(versionMetadata.label)}}>
        {'Version: {versionLabel}'}
      </Translate>
    </span>
  );
}
