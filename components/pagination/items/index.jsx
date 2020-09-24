/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PaginationContext } from '../_state/context';
import { mq } from '../../../common/css';
import PaginationItemsMap from './map';

function PaginationItems({ children, payload, payloadSettings, isLoading }) {
  const { useContext } = wp.element;
  const { Notice } = wp.components;
  const [paginationState] = useContext(PaginationContext);

  const PaginationItemsCSS = css`
    display: grid;
    grid-template-columns: repeat(${payload.length === 1 ? 1 : payloadSettings.itemsPerRow}, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: ${payloadSettings.isSingleComponent ? '0px' : '40px'};
    max-width: ${payloadSettings.dataType === 'collections' || payloadSettings.fullWidth
      ? '100%'
      : payload.length === 1 || payloadSettings.itemsPerRow === 1
      ? '300px'
      : wp.hooks.applyFilters('misc.layout.containerWidth', '1100px')};
    opacity: ${isLoading ? 0.4 : 1};
    transition: opacity ease 0.18s;
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

    ${mq('medium')} {
      padding: 0 15px;
    }
  `;

  return payload ? (
    <section className='wps-items-wrapper' css={PaginationItemsContainerCSS}>
      <section className='wps-items wps-items-list' css={PaginationItemsCSS}>
        {payload.length && (
          <PaginationItemsMap payload={payload} payloadSettings={payloadSettings}>
            {children}
          </PaginationItemsMap>
        )}
      </section>
    </section>
  ) : null;
}

export default wp.element.memo(PaginationItems);
