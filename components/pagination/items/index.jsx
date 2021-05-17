/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react';
import { mq } from '../../../common/css';
import PaginationItemsMap from './map';
import { useItemsState } from '../../items/_state/hooks';

function PaginationItems({ children }) {
  const itemsState = useItemsState();

  const PaginationItemsCSS = css`
    display: ${itemsState.payloadSettings.carousel && wpshopify.misc.isPro ? 'block' : 'grid'};
    grid-template-columns: repeat(
      ${itemsState.payload.length === 1 ? 1 : itemsState.payloadSettings.itemsPerRow},
      1fr
    );
    grid-column-gap: ${itemsState.payloadSettings.gridColumnGap
      ? itemsState.payloadSettings.gridColumnGap
      : '20px'};
    grid-row-gap: ${itemsState.payloadSettings.isSingleComponent ? '0px' : '40px'};
    max-width: ${itemsState.payloadSettings.dataType === 'collections' ||
    itemsState.payloadSettings.fullWidth
      ? '100%'
      : itemsState.payload.length === 1 || itemsState.payloadSettings.itemsPerRow === 1
      ? '333px'
      : wp.hooks.applyFilters('misc.layout.containerWidth', '1100px')};
    padding: 0;
    transition: opacity 0.3s ease;
    opacity: ${itemsState.isLoading ? 0.4 : 1};

    ${mq('medium')} {
      grid-template-columns: ${itemsState.payload.length === 1
        ? 'repeat(1, 1fr)'
        : 'repeat(2, 1fr)'};
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

  return itemsState.payload ? (
    <section className='wps-items-wrapper' css={PaginationItemsContainerCSS}>
      <section className='wps-items wps-items-list' css={PaginationItemsCSS}>
        {itemsState.payload.length ? (
          <PaginationItemsMap
            payload={itemsState.payload}
            payloadSettings={itemsState.payloadSettings}
            componentId={itemsState.componentId}>
            {children}
          </PaginationItemsMap>
        ) : null}
      </section>
    </section>
  ) : null;
}

export default PaginationItems;
