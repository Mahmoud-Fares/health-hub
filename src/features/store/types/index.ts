// Product

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: Category;
}

// Cart
export interface CartProduct {
  id: number; // هذا ID في الكارت (مثلاً id الخاص بالسلة)
  product_id: number;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number; // هذا الكمية في السلة (لكن هنا موجود في نفس الـ product في الـ API)
  subtotal: number;
  added_at: string;
}
