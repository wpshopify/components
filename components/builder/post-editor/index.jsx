import React, { useState } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Panel, PanelBody, PanelRow } from '@wordpress/components'
import { RangeControl } from '@wordpress/components'
import { ToggleControl } from '@wordpress/components'

function PostEditor() {
   const [columns, setColumns] = useState(0)

   const editorCSS = css`
      width: 300px;
      border-top: 0;
      height: 100vh;
   `

   function onChange(cols) {
      console.log('cols', cols)
      setColumns(cols)
   }

   return (
      <Panel header='Shortcode Settings' css={editorCSS} className='edit-post-sidebar'>
         <PanelBody title='Find products by' initialOpen={true}>
            <PanelRow>Query settings</PanelRow>
         </PanelBody>

         <PanelBody title='Pagination' initialOpen={false}>
            <ToggleControl label='Show pagination' checked={true} />
            <RangeControl label='Page size' value={columns} onChange={onChange} min={1} max={250} />
         </PanelBody>

         <PanelBody title='Layout' initialOpen={false}>
            <PanelRow>Layout settings</PanelRow>
         </PanelBody>

         <PanelBody title='Colors' initialOpen={false}>
            <PanelRow>Colors settings</PanelRow>
         </PanelBody>
      </Panel>
   )
}

export { PostEditor }
