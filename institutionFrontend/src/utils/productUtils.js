const getUniqueColors = (images) => {
  const colorSet = new Set(images.map((img) => img.color));
  return [...colorSet];
};

const getUniqueSizes = (details) => {
  const sizeSet = new Set(
    details.map((detail) => detail.size).filter((size) => size)
  );
  return [...sizeSet];
};

const getAvailableColorsForSize = (item, size) => {
  const sizeDetails = item.details.filter((detail) => detail.size === size);
  return new Set(sizeDetails.map((detail) => detail.color));
};

const getImagesBySelectedColor = (product, selectedColor) => {
  return product.images.filter(
    (img) => img.color.toLowerCase() === selectedColor.toLowerCase()
  );
};

export const getDetailsByColorAndSize = (
  product,
  selectedColor,
  selectedSize = null
) => {
  // If a size is provided, filter by both color and size
  if (selectedSize) {
    const matchedDetail = product.details.find(
      (detail) => detail.color === selectedColor && detail.size === selectedSize
    );
    if (!matchedDetail) return null;
    return {
      price: matchedDetail.price,
      stock: matchedDetail.stock,
      id:matchedDetail.id
    };
  }

  // If no size is provided, filter by color only
  else {
    const matchedDetail = product.details.find(
      (detail) => detail.color === selectedColor
    );
    if (!matchedDetail) return null;
    return {
      price: matchedDetail.price,
      stock: matchedDetail.stock,
      id: matchedDetail.id,
    };
  }
};



export {getUniqueColors, getUniqueSizes, getAvailableColorsForSize, getImagesBySelectedColor};



