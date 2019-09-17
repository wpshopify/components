function BuilderInitialState(options) {
   return {
      isReady: false,
      notices: [],
      shortcode: '[wps_products]',
      defaultSettings: WP_Shopify.settings,
      settings: {
         title: '',
         tag: '',
         vendor: '',
         product_type: '',
         available_for_sale: false,
         product_id: '',
         created_at: '',
         updated_at: '',
         connective: 'AND',
         limit: false,
         sort_by: 'title',
         reverse: false,
         pagination: true,
         page_size: 9,
         limit: false,
         items_per_row: 3,
         excludes: {
            title: false,
            description: false,
            images: false,
            pricing: false,
            buyButton: false
         },
         dropzone_load_more: false,
         add_to_cart_button_color: '',
         variant_button_color: '',
         add_to_cart_button_text: '',
         hide_quantity: false,
         show_quantity_label: true,
         min_quantity: 1,
         max_quantity: false,
         show_price_range: true,
         show_compare_at: false,
         quantity_label_text: 'Quantity',
         show_featured_only: false,
         show_zoom: false,
         no_results_text: 'No products found',
         infinite_scroll: false,
         infinite_scroll_offset: 100
      }
   }
}

export { BuilderInitialState }
