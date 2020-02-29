/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const containerFluidCSS = css`
  width: 100%;
  padding: 0;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
`

const flexRowCSS = css`
  display: flex;
`

const rowCSS = css`
  && {
    padding: 0 1em;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    flex: 1;
    width: calc(100% - 2em);

    &[data-item-is-loading='true'] {
      .wps-item {
        opacity: 0.4;
      }
    }
  }
`

export { containerFluidCSS, rowCSS, flexRowCSS }
