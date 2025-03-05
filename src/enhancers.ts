import { EnhancerBuilder } from '@uniformdev/canvas';
import { registerEnhancers } from './utils/enhancers';

// Create the enhancer builder
export const enhancerBuilder = new EnhancerBuilder();

// Register all enhancers
registerEnhancers(enhancerBuilder);

// Export the enhancer builder for use in the application
export default enhancerBuilder; 