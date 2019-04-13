import { usePortal } from '../../common/hooks'

function Dropzone({ children, dropzone, isLoading }) {
   return !isLoading && usePortal(children, document.querySelector(dropzone))
}

export { Dropzone }
