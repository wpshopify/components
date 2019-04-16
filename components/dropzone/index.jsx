import { usePortal } from '../../common/hooks'

function Dropzone({ children, dropzone }) {
   return usePortal(children, document.querySelector(dropzone))
}

export { Dropzone }
