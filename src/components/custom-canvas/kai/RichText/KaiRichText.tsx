import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { transformToPortableText, toHTML, PortableTextHtmlResolvers } from '@kontent-ai/rich-text-resolver';
import { resolveImage, resolveTable } from '@kontent-ai/rich-text-resolver/utils/html';

// Here, you can add parameters to be used on the canvas side.
export type KaiRichTextParameters = {
  kairichtext?: KontentRichTextData;
};
// Here, you can add slots names to be used on the canvas side.
enum KaiRichTextSlots {
  KaiRichTextContent = 'kaiRichTextContent',
}

type KaiRichTextProps = ComponentProps<KaiRichTextParameters, KaiRichTextSlots>;

// Define the structure of the Kontent.ai rich text data
interface KontentRichTextData {
  value: string;
  links?: Record<string, any>;
  images?: Record<
    string,
    {
      url: string;
      width: number;
      height: number;
      image_id: string;
      description: string | null;
    }
  >;
  modular_content?: string[];
  modular_content_items?: Record<string, any>;
}

const KaiRichText: FC<KaiRichTextProps> = ({ kairichtext }) => {
  // If no rich text data is provided, return empty div
  if (!kairichtext) {
    return <div>No rich text content available</div>;
  }

  try {
    // Parse the rich text data from the string prop
    const richTextData: KontentRichTextData = kairichtext;

    // Transform the rich text HTML to portable text
    const portableText = transformToPortableText(richTextData.value);

    // For debugging
    // console.log('Portable Text:', JSON.stringify(portableText, null, 2));

    // Define resolvers for the portable text
    const resolvers: PortableTextHtmlResolvers = {
      components: {
        types: {
          // Resolve images in the rich text
          image: ({ value }) => {
            // Handle different reference formats
            const imageId = value.image?._ref || value.asset?._ref;
            if (richTextData.images && richTextData.images[imageId]) {
              const image = richTextData.images[imageId];
              return resolveImage(
                value,
                () =>
                  `<img src="${image.url}" alt="${image.description || ''}" width="${image.width}" height="${image.height}" class="kai-rich-text-image" />`
              );
            }
            return `<div>Image not found: ${imageId}</div>`;
          },

          // Resolve linked items (components embedded in the rich text)
          componentOrItem: ({ value }) => {
            const contentItemCodename = value.componentOrItem._ref;

            // Check if the linked item exists in modular_content_items
            if (richTextData.modular_content_items && richTextData.modular_content_items[contentItemCodename]) {
              const linkedItem = richTextData.modular_content_items[contentItemCodename];

              // Create a simple representation of the linked item
              return `<div class="linked-item">
                <h3>${linkedItem.system?.name || 'Linked Item'}</h3>
                ${linkedItem.elements?.richtext?.value || ''}
              </div>`;
            }

            return `<div>Linked item not found: ${contentItemCodename}</div>`;
          },

          // Resolve tables in the rich text - this handles the Portable Text table type
          table: ({ value }) => {
           
       

            // Use the resolveTable helper with our custom renderers
            const customResolver = (blocks: any) => toHTML(blocks);
            const tableHtml = resolveTable(value, customResolver);
            
            // Wrap the table in a responsive container and add our custom classes
            return `<div class="kai-rich-text-table-wrapper">${tableHtml.replace('<table>', '<table class="kai-rich-text-table">')}</div>`;
          },
          // Custom renderer for headings

        },
        // Portable Text specific list type
        list: (props: any) => {
          const listType = props.value?.listItem === 'number' ? 'ol' : 'ul';
          const className = listType === 'ol' ? 'kai-rich-text-ol' : 'kai-rich-text-ul';
          return `<${listType} class="${className}">${props.children}</${listType}>`;
        },
        // Portable Text specific list item type
        listItem: (props: any) => {
          return `<li class="kai-rich-text-li">${props.children}</li>`;
        },
        // Hard break handling
        hardBreak: () => {
          return '<br />';
        },

        marks: {
          // Resolve links to content items
          contentItemLink: (props: any) => {
            const contentItemId = props.value?.contentItemLink?._ref || '';
            // You can implement custom logic for content item links here
            return `<a href="#${contentItemId}" class="content-item-link">${props.children}</a>`;
          },

          // Resolve external links
          link: (props: any) => {
            const href = props.value?.href || '';
            const target = props.value?.['data-new-window'] ? '_blank' : '_self';
            const rel = props.value?.rel || '';
            const title = props.value?.title || '';
            return `<a href="${href}" target="${target}" rel="${rel}" title="${title}">${props.children}</a>`;
          },
        },

        // Add custom block renderers for lists and other block elements
        block: {
          h1: (props: any) => {
            return `<h1 class="kai-rich-text-h1">${props.children}</h1>`;
          },
          h2: (props: any) => {
            return `<h2 class="kai-rich-text-h2">${props.children}</h2>`;
          },
          h3: (props: any) => {
            return `<h3 class="kai-rich-text-h3">${props.children}</h3>`;
          },
          h4: (props: any) => {
            return `<h4 class="kai-rich-text-h4">${props.children}</h4>`;
          },
          // Move row and cell into the blocks section
          row: (props: any) => {
            return `<tr class="kai-rich-text-table-row">${props.children}</tr>`;
          },
          cell: (props: any) => {
            return `<td class="kai-rich-text-table-cell">${props.children}</td>`;
          },
          // Custom renderer for ordered lists
          ol: (props: any) => {
            return `<ol class="kai-rich-text-ol">${props.children}</ol>`;
          },
          // Custom renderer for unordered lists
          ul: (props: any) => {
            return `<ul class="kai-rich-text-ul">${props.children}</ul>`;
          },
          // Custom renderer for list items
          li: (props: any) => {
            return `<li class="kai-rich-text-li">${props.children}</li>`;
          },
          // Custom renderer for paragraphs
          p: (props: any) => {
            return `<p class="kai-rich-text-p">${props.children}</p>`;
          },
        },
      },
    };

    // Convert the portable text to HTML with the resolvers
    const resolvedHtml = toHTML(portableText, resolvers);

    // Return the resolved HTML content
    return <div className="kai-rich-text-content" dangerouslySetInnerHTML={{ __html: resolvedHtml }} />;
  } catch (error) {
    console.error('Error parsing or rendering rich text:', error);
    return <div className="kai-rich-text-error">Error rendering rich text content: {String(error)}</div>;
  }
};

export default KaiRichText;
