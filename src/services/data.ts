import useAuthStore from "../../store/authStore";
export async function fetchProducts({ token }: { token: string }) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Data from API:', data);
    return data;
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw new Error('Error al cargar los productos.');
  }
}

export async function fetchLogin(email: String, password: String) {
  try {
    await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      credentials: 'include',
    });
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    const data = await response.json();

    if (data.status === 1) {
      const { message, user } = data;
      useAuthStore.getState().login(message, user);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { success: false, message: 'Error al iniciar sesión.' };
  }
};
