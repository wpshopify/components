/** @jsx jsx */
import { jsx, css } from "@emotion/core"

const containerFluidCSS = css`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  padding-top: 0;
  padding-bottom: 0;
`

const rowCSS = css`
  && {
    margin: 0 -15px 0 -15px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding-top: 0;
    padding-bottom: 0;
    flex: 1;
    width: 100%;

    &[data-item-is-loading="true"] {
      .wps-item {
        opacity: 0.4;
      }
    }
  }
`

export { containerFluidCSS, rowCSS }
