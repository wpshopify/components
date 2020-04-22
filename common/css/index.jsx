/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const bp = {
  small: 500,
}

const mq = (n) => {
  const bpArray = Object.keys(bp).map((key) => [key, bp[key]])

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (max-width: ${size}px)`]
    return acc
  }, [])

  return result
}

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

    ${mq('small')} {
      width: 100%;
    }

    &[data-item-is-loading='true'] {
      .wps-item {
        opacity: 0.4;
      }
    }
  }
`

export { containerFluidCSS, rowCSS, flexRowCSS, mq }
