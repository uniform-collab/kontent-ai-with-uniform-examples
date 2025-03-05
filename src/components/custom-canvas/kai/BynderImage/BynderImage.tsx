import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';

export type BynderImageParameters = {
  id?: string;
  webUrl?: string;
  title?: string;
};

type BynderImageProps = ComponentProps<BynderImageParameters>;

/**
 * BynderImage component that renders an image from Bynder
 * The bynderImage parameter is enhanced to extract id, webUrl, and title
 * @see src/utils/enhancers.ts for the enhancer implementation
 */
export const BynderImage: FC<BynderImageProps> = ({ id, webUrl, title }) => {
  if (!webUrl) {
    //console.log('No webUrl provided, returning null');

    return null;
  }

  return <img src={webUrl} alt={title || 'Bynder image'} title={title} data-bynder-id={id} />;
};
