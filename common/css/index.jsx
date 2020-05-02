/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const bp = {
  small: 600,
}

const mq = (n) => {
  const bpArray = Object.keys(bp).map((key) => [key, bp[key]])

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (max-width: ${size}px)`]
    return acc
  }, [])

  return result
}

const flexRowCSS = css`
  display: flex;
`

const flexColSmallCSS = css`
  ${mq('small')} {
    flex-direction: column;
  }
`

const rowCSS = css`
  && {
    padding: 0 1em;
    margin: 0 auto;
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

const containerFluidCSS = css`
  width: 100%;
  padding: 0;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
`

export { rowCSS, flexRowCSS, flexColSmallCSS, containerFluidCSS, mq }
