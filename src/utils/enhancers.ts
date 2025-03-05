import { EnhancerBuilder } from '@uniformdev/canvas';

/**
 * Enhancer for Bynder images that parses the JSON string from the CMS
 * and extracts id, webUrl, and title properties
 */
export const bynderImageEnhancer = (options: any) => {
  const { parameter, component, parameterName } = options;


  // Skip if the parameter is not bynderImage or if it's already processed
  if (!parameter.value || typeof parameter.value !== 'string') {
    //console.log('Skipping enhancer - invalid value');
    return;
  }

  try {
    // Parse the JSON string
    const bynderData = JSON.parse(parameter.value);

    // If it's an array, take the first item
    const imageData = Array.isArray(bynderData) ? bynderData[0] : bynderData;

    if (!imageData) {
      //console.log('Skipping enhancer - no image data');
      return;
    }

    // Extract the properties
    const { id, webUrl, title, previewUrl } = imageData;

    // Add the extracted properties to the component parameters
    component.parameters.id = { value: id };
    component.parameters.webUrl = { value: webUrl || previewUrl };
    component.parameters.title = { value: title };


  } catch (error) {
    console.error('Error parsing Bynder image data:', error);
  }
};

/**
 * Register all enhancers
 */
export const registerEnhancers = (enhancerBuilder: EnhancerBuilder) => {
  // Register for any component with a 'bynderImage' parameter
  enhancerBuilder.parameterName('bynderImage', bynderImageEnhancer);
};
