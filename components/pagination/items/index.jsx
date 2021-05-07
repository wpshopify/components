/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react';
import { PaginationContext } from '../_state/context';
import { mq } from '../../../common/css';
import PaginationItemsMap from './map';

function PaginationItems({ children, payload, payloadSettings, componentId }) {
  const fadeIn = keyframes`
      0% {
         opacity: 0;
      }

      100% {
         opacity: 1;
      }
   `;

  const PaginationItemsCSS = css`
    display: ${payloadSettings.carousel && wpshopify.misc.isPro ? 'block' : 'grid'};
    grid-template-columns: repeat(${payload.length === 1 ? 1 : payloadSettings.itemsPerRow}, 1fr);
    grid-column-gap: ${payloadSettings.gridColumnGap ? payloadSettings.gridColumnGap : '20px'};
    grid-row-gap: ${payloadSettings.isSingleComponent ? '0px' : '40px'};
    max-width: ${payloadSettings.dataType === 'collections' || payloadSettings.fullWidth
      ? '100%'
      : payload.length === 1 || payloadSettings.itemsPerRow === 1
      ? '300px'
      : wp.hooks.applyFilters('misc.layout.containerWidth', '1100px')};
    animation: ${fadeIn} 0.3s;
    padding: 0;

    ${mq('medium')} {
      grid-template-columns: ${payload.length === 1 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)'};
    }

    ${mq('small')} {
      grid-template-columns: ${'repeat(' +
      wp.hooks.applyFilters('misc.layout.mobileColumns', 1) +
      ', 1fr)'};
    }
  `;

  const PaginationItemsContainerCSS = css`
    max-width: ${wp.hooks.applyFilters('misc.layout.containerWidth', '1100px')};
    margin: 0 auto;
    padding: 0;

    ${mq('medium')} {
      padding: 0 15px;
    }
  `;

  return payload ? (
    <section className='wps-items-wrapper' css={PaginationItemsContainerCSS}>
      <section className='wps-items wps-items-list' css={PaginationItemsCSS}>
        {payload.length && (
          <PaginationItemsMap
            payload={payload}
            payloadSettings={payloadSettings}
            componentId={componentId}>
            {children}
          </PaginationItemsMap>
        )}
      </section>
    </section>
  ) : null;
}

export default wp.element.memo(PaginationItems);
