import { usePortal } from '../../common/hooks'

function Dropzone({ children, dropzone }) {
   console.log('dropzone', dropzone)
   console.log('children', children)

   return usePortal(children, document.querySelector(dropzone))
}

export { Dropzone }
