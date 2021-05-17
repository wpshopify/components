const Placeholder = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Placeholder-public' */ '../../../common/placeholders')
);

const Carousel = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Carousel-public' */ '../../carousel')
);

function PagMap({ childrenItems, payload, payloadSettings, componentId }) {
  return payload.map((item) => {
    return wp.element.cloneElement(childrenItems, {
      key: item.id,
      payload: item,
      payloadSettings: payloadSettings,
      componentId: componentId,
    });
  });
}

function CarouselMapped({ item, childrenItems, payloadSettings, componentId }) {
  return wp.element.cloneElement(childrenItems, {
    key: item.id,
    payload: item,
    payloadSettings: payloadSettings,
    componentId: componentId,
  });
}

function PaginationItemsMap({ children, payload, payloadSettings, componentId }) {
  const { Suspense } = wp.element;

  return payloadSettings.carousel && payload.length && wpshopify.misc.isPro ? (
    <Suspense fallback={<Placeholder type={payloadSettings.componentType} />}>
      <Carousel payloadSettings={payloadSettings}>
        {payload.map((item) => (
          <CarouselMapped
            key={item.id}
            item={item}
            childrenItems={children}
            payloadSettings={payloadSettings}
            componentId={componentId}
          />
        ))}
      </Carousel>
    </Suspense>
  ) : (
    <PagMap
      childrenItems={children}
      payload={payload}
      payloadSettings={payloadSettings}
      componentId={componentId}
    />
  );
}

export default wp.element.memo(PaginationItemsMap);
