export default function FormatProduct({ key, imageUrl, name, property, quantity, price }) {
  const [size, color] = property.split(',');
  console.log(size, color);
  return {
    key,
    info: {
      imageUrl,
      name,
      color,
      size,
    },
    quantity,
    price,
  }
}