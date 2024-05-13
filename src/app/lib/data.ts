export async function fetchProducts() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/products');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw new Error('Failed to fetch products data.');
  }
}

