import { getAuthHeaders } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'https://razoo-be.onrender.com';

// --- Get my style (face analysis) ---
export type HairLength = 'short' | 'medium' | 'long';

export interface AnalyzeResponse {
  face_shape: string;
  confidence: number;
  suggestions: string[];
  suggestion_scores?: { name: string; score: number; reason?: string }[];
  annotated_image?: string; // base64
  metrics?: Record<string, number>;
  message?: string;
}

export async function getMyStyle(
  imageFile: File,
  hairLength: HairLength = 'short'
): Promise<{ success: boolean; data?: AnalyzeResponse; error?: string }> {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('hair_length', hairLength);
  const res = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = json.detail || json.message || json.error || 'Analysis failed';
    return { success: false, error: typeof msg === 'string' ? msg : JSON.stringify(msg) };
  }
  const data = json.data ?? json;
  return {
    success: true,
    data: {
      face_shape: data.face_shape,
      confidence: data.confidence ?? 0,
      suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
      suggestion_scores: data.suggestion_scores,
      annotated_image: data.annotated_image,
      metrics: data.metrics,
      message: data.message,
    },
  };
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) return { success: false, error: json.message || json.error || 'Login failed' };
  return { success: true, token: json.token };
}

export interface AdminOrder {
  id: string;
  name: string;
  email: string;
  phone?: string;
  hairstyle?: string;
  preferred_date?: string;
  preferred_time?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'complete';
  created_at: string;
}

export async function getAdminOrders(): Promise<{ success: boolean; data?: AdminOrder[]; error?: string }> {
  const res = await fetch(`${API_URL}/api/admin/orders`, { headers: getAuthHeaders() });
  const json = await res.json();
  if (!res.ok) return { success: false, error: json.message || json.error || 'Failed to load orders' };
  return { success: true, data: json.data ?? [] };
}

export async function updateOrderStatus(
  id: string,
  status: AdminOrder['status']
): Promise<{ success: boolean; data?: AdminOrder; error?: string }> {
  const res = await fetch(`${API_URL}/api/admin/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ status }),
  });
  const json = await res.json();
  if (!res.ok) return { success: false, error: json.message || json.error || 'Update failed' };
  return { success: true, data: json.data };
}

export async function deleteOrder(id: string): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${API_URL}/api/admin/orders/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const json = await res.json();
  if (!res.ok) return { success: false, error: json.message || json.error || 'Delete failed' };
  return { success: true };
}

export interface AdminContact {
  id: number;
  name: string;
  phone: string;
  email?: string; // legacy, prefer phone
  subject?: string;
  message: string;
  created_at: string;
}

export async function getAdminContacts(): Promise<{
  success: boolean;
  data?: AdminContact[];
  error?: string;
}> {
  const res = await fetch(`${API_URL}/api/admin/contacts`, { headers: getAuthHeaders() });
  const json = await res.json();
  if (!res.ok) return { success: false, error: json.message || json.error || 'Failed to load contacts' };
  return { success: true, data: json.data ?? [] };
}

export async function bookAppointment(data: {
  name: string;
  phone?: string;
  hairstyle?: string;
  preferred_date?: string;
  preferred_time?: string;
  notes?: string;
}): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${API_URL}/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone ?? undefined,
      hairstyle: data.hairstyle ?? undefined,
      preferred_date: data.preferred_date ?? undefined,
      preferred_time: data.preferred_time ?? undefined,
      notes: data.notes ?? undefined,
    }),
  });
  const json = await res.json();
  if (!res.ok) return { success: false, error: json.message || json.error || 'Booking failed' };
  return { success: true };
}

export async function submitContact(data: {
  name: string;
  phone: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) return { success: false, error: json.message || json.error || 'Failed to send message' };
  return { success: true };
}
