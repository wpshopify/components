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
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    flex: 1;
    width: 100%;

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

const buttonCSS = css`
  border-radius: 8px;
  padding: 14px 0 15px 0;
  transition: background-color 180ms ease;
  height: auto;
  font-weight: normal;
  position: relative;
  text-decoration: none;
  display: inline-block;
  border: none;
  line-height: 1;
  text-align: center;
  color: #fff;
  width: 100%;
  max-width: 100%;
  white-space: normal;
  background-color: #415aff;
  font-size: 18px;

  ${mq('small')} {
    font-size: 16px;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }

  &:disabled {
    background-color: #d4d4d4 !important;
    box-shadow: none;
  }

  &:focus {
    outline: none;
    border: none;
  }
`

const loadMoreButtonCSS = css`
  max-width: 150px;
`

export { rowCSS, flexRowCSS, flexColSmallCSS, containerFluidCSS, buttonCSS, loadMoreButtonCSS, mq }
