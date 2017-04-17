import * as React from 'react';
import {SVGSource} from '@shopify/images';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import {
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  cancel,
  circleCheckMark,
  circleAlert,
  checkmark,
  cancelMicro,
  checklist,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  confetti,
  delete as deleteIcon,
  flag,
  search,
  caretDown,
  caretUp,
} from '../../icons';

import * as styles from './Icon.scss';

export type Size = 8 | 10 | 12 | 16 | 20 | 24 | 40 | 80 | 'fill';
export type Color = (
  'white' |
  'black' |
  'skyLighter' | 'skyLight' | 'sky' | 'skyDark' |
  'inkLightest' | 'inkLighter' | 'inkLight' | 'ink' |
  'blueLighter' | 'blueLight' | 'blue' | 'blueDark' | 'blueDarker' |
  'indigoLighter' | 'indigoLight' | 'indigo' | 'indigoDark' | 'indigoDarker' |
  'tealLighter' | 'tealLight' | 'teal' | 'tealDark' | 'tealDarker' |
  'greenLighter' | 'green' | 'greenDark' |
  'yellowLighter' | 'yellow' | 'yellowDark' |
  'orange' |
  'redLighter' | 'red' | 'redDark' |
  'purple'
);

export const BUNDLED_ICONS = {
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  cancel,
  circleCheckMark,
  circleAlert,
  checkmark,
  cancelMicro,
  checklist,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  confetti,
  delete: deleteIcon,
  flag,
  search,
  caretDown,
  caretUp,
};

const COLORS_WITH_BACKDROPS = ['teal', 'tealDark', 'greenDark', 'redDark', 'yellowDark', 'ink'];

export interface Props {
  source: SVGSource | 'placeholder' | keyof typeof BUNDLED_ICONS,
  size?: Size,
  color?: Color,
  backdrop?: boolean,
  accessibilityLabel?: string,
}

export default function Icon({source, size, color, backdrop, accessibilityLabel}: Props) {
  if (color && backdrop && !COLORS_WITH_BACKDROPS.includes(color)) {
    // tslint:disable-next-line no-console
    console.warn(`The ${color} icon doesn't accept backdrops. The icon colors that have backdrops are: ${COLORS_WITH_BACKDROPS.join(', ')}`);
  }

  const className = classNames(
    styles.Icon,
    size && styles[variationName('size', size)],
    color && styles[variationName('color', color)],
    backdrop && styles.hasBackdrop,
  );

  let content: React.ReactNode;

  if (source === 'placeholder') {
    content = <div className={styles.Placeholder} />;
  } else {
    const iconSource = typeof source === 'string' ? BUNDLED_ICONS[source] : source;
    content = (
      <svg
        className={styles.Svg}
        viewBox={iconSource.viewBox}
        dangerouslySetInnerHTML={{__html: iconSource.body}}
      />
    );
  }

  return (
    <span className={className} aria-label={accessibilityLabel}>
      {content}
    </span>
  );
}