/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const bp = {
  xsmall: 400,
  small: 600,
  medium: 800,
  large: 1100,
};

const mq = (n) => {
  const bpArray = Object.keys(bp).map((key) => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (max-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

const flexRowCSS = css`
  display: flex;
`;

const flexColSmallCSS = css`
  ${mq('small')} {
    flex-direction: column;
  }
`;

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
`;

const containerFluidCSS = css`
  width: 100%;
  padding: 0;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
`;

const buttonCSS = css`
  border-radius: 7px;
  padding: 14px 0 15px 0;
  transition: background 180ms ease;
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
  background: #415aff;
  font-size: 18px;
  outline: none;
  outline-offset: 0;

  ${mq('small')} {
    font-size: 16px;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    border: none;
    box-shadow: none;
    outline: none;

    > svg {
      opacity: 0.7;
    }
  }

  &:focus {
    border: none;
    box-shadow: none;
    outline: none;
    top: auto;
  }
`;

const IconCSS = css`
  content: '';
  position: relative;
  vertical-align: middle;
  pointer-events: auto;

  &.wps-btn {
    padding-right: 2.6em;
    text-decoration: none;
    padding-left: 2.6em;
    width: 100%;
    max-width: 100%;
  }
`;

export { rowCSS, flexRowCSS, flexColSmallCSS, containerFluidCSS, buttonCSS, IconCSS, mq };
