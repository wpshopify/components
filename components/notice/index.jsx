/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react';

function Notice({ children, status, extraCSS = false }) {
  const slideInFromTop = keyframes`
      0% {
         opacity: 0;
         transform: translateY(-10px);
      }
      100% {
         opacity: 1;
         transform: translateY(0);
      }
   `;

  const noticeStyles = css`
    margin: 0;
    background-color: ${status === 'warning'
      ? '#fef8e7'
      : status === 'info'
      ? '#e8f5f9'
      : status === 'error'
      ? '#f8ebea'
      : '#eef6ee'};
    padding: 0.6em 1.1em;
    border-left: 0.35em solid
      ${status === 'warning'
        ? '#f0b849'
        : status === 'info'
        ? '#419ecd'
        : status === 'error'
        ? '#cd423b'
        : '#4db54f'};
    animation: 0.2s ease ${slideInFromTop};
    font-size: 15px;
  `;

  return <p css={[noticeStyles, extraCSS]}>{children}</p>;
}

export default Notice;
