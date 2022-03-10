export default function FormatProduct({ key, img, name, color, size, amount, price }) {
    return {
      key,
      info: {
        img,
        name,
        color,
        size,
      },
      amount,
      price,
    }
  }