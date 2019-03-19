function isInt(val) {
   return Number.isInteger(val);
}

function isString(val) {
   return typeof val === "string" || val instanceof String;
}

function explode(value, delimiter) {
   return value.split(delimiter);
}

function getExtension(path) {
   var first = path.split(".");
   console.log("first", first);
   var second = first[first.length - 1];
   console.log("second", second);
   var third = second.split("?")[0];
   console.log("third", third);

   return third;
}

/*

Responsible for splitting image into parts

*/
function splitFromExtension(imageUrl, extension) {
   var delimiter = "." + extension;

   return explode(imageUrl, delimiter);
}

/*

Responsible for building width and height filter

*/
function buildWidthHeightFilter(width = 0, height = 0) {
   if (!isInt(width) || width < 0) {
      width = 0;
   }

   if (!isInt(height) || height < 0) {
      height = 0;
   }

   // Both set
   if (width !== 0 && height !== 0) {
      return "_" + width + "x" + height;
   }

   // Only width set
   if (height === 0 && width !== 0) {
      return "_" + width + "x";
   }

   // Only height set
   if (width === 0 && height !== 0) {
      return "_x" + height;
   }

   return "";
}

/*

Responsible for taking an $imageUrl and returning its parts.

*/
function splitImageUrl(imageUrl) {
   let extension = getExtension(imageUrl);
   console.log("extension", extension);

   if (!extension) {
      return false;
   }

   let imageParts = splitFromExtension(imageUrl, extension);
   console.log("imageParts", imageParts);

   return {
      extension: extension,
      beforeExtension: imageParts[0],
      afterExtension: imageParts[1]
   };
}

/*

Responsible for taking a $crop value and returning the URL string version.

Empty string is no $crop set

*/
function buildCropFilter(crop = "") {
   console.log("crop", crop);

   if (!crop || !isString(crop) || crop === "none") {
      return "";
   }

   return "_crop_" + crop;
}

/*

Responsible for taking a $scale value and returning the URL string version.

Empty string is no $scale set

*/
function buildScaleFilter(scale = 0) {
   if (!scale || !isInt(scale) || scale <= 1 || scale > 3) {
      return "";
   }

   return "@" + scale + "x";
}

/*

Responsible for adding width and height filter to image URL

*/
function addCustomSizeToImageUrl(width, height, imageUrl) {
   let splitParts = splitImageUrl(imageUrl);

   if (splitParts === false) {
      return imageUrl;
   }

   return (
      splitParts.beforeExtension +
      buildWidthHeightFilter(width, height) +
      "." +
      splitParts.extension +
      splitParts.afterExtension
   );
}

function autoWidthAndHeight(settings) {
   if (settings.width) {
      return settings.width === 0 && settings.height === 0;
   }

   return true;
}

/*

Responsible for adding crop filter to image URL

*/
function addCustomCropToImageUrl(settings, imageUrl) {
   let splitParts = splitImageUrl(imageUrl);
   console.log(
      "addCustomCropToImageUrladdCustomCropToImageUrl splitParts",
      splitParts
   );

   console.log("settings", settings);

   if (splitParts === false || !settings.crop || autoWidthAndHeight(settings)) {
      console.log("............. 1111");

      return imageUrl;
   }

   return (
      splitParts.beforeExtension +
      buildCropFilter(settings.crop) +
      "." +
      splitParts.extension +
      splitParts.afterExtension
   );
}

/*

Responsible for adding scale filter to image URL

*/
function addCustomScaleToImageUrl(settings, imageUrl) {
   let splitParts = splitImageUrl(imageUrl);

   if (splitParts === false || settings.scale <= 1 || settings.scale > 3) {
      return imageUrl;
   }

   return (
      splitParts.beforeExtension +
      buildScaleFilter(settings.scale) +
      "." +
      splitParts.extension +
      splitParts.afterExtension
   );
}

/*

$settings is an array with this structure:

[
   'src'			=> 'https://cdn.shopify.com/s/files/1/1405/0664.jpg',
   'width'		=> 300
   'height'	=> 0
   'crop'		=> 'none'
   'scale'		=> 0
]

TODO: Just pass the $settings instead

*/
function addCustomSizingToImageUrl(settings) {
   // Returns a modified image URL
   return addCustomScaleToImageUrl(
      settings,
      addCustomCropToImageUrl(
         settings,
         addCustomSizeToImageUrl(settings.width, settings.height, settings.src)
      )
   );
}

export {
   splitFromExtension,
   buildWidthHeightFilter,
   splitImageUrl,
   buildCropFilter,
   buildScaleFilter,
   addCustomSizeToImageUrl,
   autoWidthAndHeight,
   addCustomCropToImageUrl,
   addCustomScaleToImageUrl,
   addCustomSizingToImageUrl
};
