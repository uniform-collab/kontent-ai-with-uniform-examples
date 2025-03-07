import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import Container from './Container';
import CustomComponent from './CustomComponent';
import KaiRichText from './kai/RichText/KaiRichText';
import { BynderImage } from './kai/BynderImage/BynderImage';
// Here, you can add your own component or customize an existing CSK component with your logic or styles.
export const customComponentsMapping: ComponentMapping = {
  // This is a simple example of how you can add your own components.
  customComponent: { component: CustomComponent },
  kaiRichtext: { component: KaiRichText },
  // This is an overridden CSK Container component.
  container: { component: Container },
  // Bynder image component
  bynderimage: { component: BynderImage },
};
