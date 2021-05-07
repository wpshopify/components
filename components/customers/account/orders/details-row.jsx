import PrettyPrice from '../../../../common/pricing/pretty';
import { addCustomSizingToImageUrl } from '../../../../common/images';
import { ShopContext } from '../../../shop/_state/context';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Td } from '../../../tables/body/td';

const { useContext } = wp.element;

function OrderDetailsRow({ lineItem }) {
  const [shopState] = useContext(ShopContext);

  const sdfasdf = css`
    display: flex;
  `;
  const asdasd = css`
    padding-left: 1em;
  `;

  return (
    <tr>
      <Td>
        <div css={sdfasdf}>
          <img
            src={addCustomSizingToImageUrl({
              src: lineItem.variant.image.originalSrc,
              width: 100,
              height: 100,
              crop: 'center',
            })}
            alt={lineItem.variant.image.altText}
            loading='lazy'
          />
          <p css={asdasd}>{lineItem.title + '-' + lineItem.variant.title}</p>
        </div>
      </Td>
      <Td>{lineItem.variant.sku}</Td>
      <Td align='right'>
        <PrettyPrice
          price={lineItem.variant.priceV2.amount}
          currencyCode={shopState.info.currencyCode}
        />
      </Td>
      <Td align='right'>{lineItem.quantity}</Td>
      <Td align='right'>
        <PrettyPrice
          price={shopState.info.currencyCode}
          currencyCode={shopState.info.currencyCode}
        />
      </Td>
    </tr>
  );
}

export { OrderDetailsRow };
