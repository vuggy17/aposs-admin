export default function FormatProduct({ key, imageUrl, name, property, setId, quantity, price }) {
  const [size, color,] = property.split(',');
  console.log(size, color);
  return {
    key,
    info: {
      imageUrl,
      name,
      color,
      size,
      setId,
    },
    quantity,
    price,
  }
}