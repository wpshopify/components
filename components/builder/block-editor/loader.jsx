import React from 'react'
import ContentLoader from 'react-content-loader'

function SkeletonLoader() {
   return (
      <ContentLoader height={160} width={600} speed={2} primaryColor='#f3f3f3' secondaryColor='#ecebeb'>
         <rect x='1' y='0' rx='0' ry='0' width='151' height='62' />
         <rect x='1' y='77' rx='0' ry='0' width='151' height='9' />
         <rect x='224' y='1' rx='0' ry='0' width='151' height='62' />
         <rect x='448' y='1' rx='0' ry='0' width='151' height='62' />
         <rect x='-2' y='100' rx='0' ry='0' width='89' height='8' />
         <rect x='224' y='78' rx='0' ry='0' width='151' height='9' />
         <rect x='224' y='99' rx='0' ry='0' width='89' height='8' />
         <rect x='448' y='77' rx='0' ry='0' width='151' height='9' />
         <rect x='448' y='98' rx='0' ry='0' width='89' height='8' />
      </ContentLoader>
   )
}

export { SkeletonLoader }
