const categories = [
  { name: 'Electronics', description: 'Gadgets, devices and consumer electronics' },
  { name: 'Fashion', description: 'Apparel, footwear and accessories' },
  { name: 'Home & Living', description: 'Home decor, furniture and essentials' },
];

const sampleProducts = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    description: 'High-fidelity audio with active noise cancellation and 30-hour battery life.',
    price: 199.99,
    stock: 25,
    imageUrl: '/images/headphones.jpg',
  },
  {
    name: 'Ergonomic Mechanical Keyboard',
    description: 'Customizable RGB backlighting with hot-swappable tactile switches.',
    price: 129.50,
    stock: 15,
    imageUrl: '/images/keyboard.jpg',
  },
];

module.exports = { categories, sampleProducts };
