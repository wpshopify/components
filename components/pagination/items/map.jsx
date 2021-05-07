const Placeholder = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Placeholder-public' */ '../../../common/placeholders')
);

const Carousel = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Carousel-public' */ '../../carousel')
);

function PagMap({ childrenItems, payload, payloadSettings }) {
  return payload.map((item) => {
    return wp.element.cloneElement(childrenItems, {
      key: item.id,
      payload: item,
      payloadSettings: payloadSettings,
    });
  });
}

function CarouselMapped({ item, childrenItems, payloadSettings }) {
  return wp.element.cloneElement(childrenItems, {
    key: item.id,
    payload: item,
    payloadSettings: payloadSettings,
  });
}

function PaginationItemsMap({ children, payload, payloadSettings }) {
  const { Suspense } = wp.element;

  return payloadSettings.carousel && wpshopify.misc.isPro ? (
    <Suspense fallback={<Placeholder type={payloadSettings.componentType} />}>
      <Carousel payloadSettings={payloadSettings}>
        {payload.map((item) => (
          <CarouselMapped
            key={item.id}
            item={item}
            childrenItems={children}
            payloadSettings={payloadSettings}
          />
        ))}
      </Carousel>
    </Suspense>
  ) : (
    <PagMap childrenItems={children} payload={payload} payloadSettings={payloadSettings} />
  );
}

export default wp.element.memo(PaginationItemsMap);
