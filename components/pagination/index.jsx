import PaginationControlsWrapper from './controls-wrapper';
import PaginationItems from './items';

function Pagination({ children }) {
  return (
    <>
      <PaginationItems>{children}</PaginationItems>
      <PaginationControlsWrapper />
    </>
  );
}

export default Pagination;
