import { useState, useEffect } from 'react';
import {
  getAdminOrders,
  updateOrderStatus,
  deleteOrder,
  type AdminOrder,
} from '../../lib/api';

const STATUS_OPTIONS: AdminOrder['status'][] = ['pending', 'confirmed', 'in_progress', 'complete'];

function formatDate(d: string | undefined): string {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-AE', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return String(d);
  }
}

function formatTime(t: string | undefined): string {
  if (!t) return '—';
  return String(t);
}

export default function AdminAppointments() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await getAdminOrders();
    if (res.success && res.data) setOrders(res.data);
    else setError(res.error ?? 'Failed to load appointments');
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: string, status: AdminOrder['status']) => {
    setUpdatingId(id);
    const res = await updateOrderStatus(id, status);
    setUpdatingId(null);
    if (res.success && res.data) {
      setOrders((prev) => prev.map((o) => (o.id === id ? res.data! : o)));
    } else {
      setError(res.error ?? 'Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this appointment? This cannot be undone.')) return;
    setDeletingId(id);
    const res = await deleteOrder(id);
    setDeletingId(null);
    if (res.success) setOrders((prev) => prev.filter((o) => o.id !== id));
    else setError(res.error ?? 'Delete failed');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Appointments</h1>
          <p className="mt-1 text-sm text-gray-400">Browse and manage all bookings.</p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="rounded-lg border border-amber-500/20 bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        >
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {loading && orders.length === 0 ? (
        <div className="rounded-xl border border-amber-500/20 bg-neutral-800 p-12 text-center text-gray-400">
          Loading appointments…
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-amber-500/20 bg-neutral-800 p-12 text-center text-gray-400">
          No appointments yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-amber-500/20 bg-neutral-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-amber-500/20">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-400">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-400">Date & time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-400">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-400">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-amber-500/10 last:border-0 hover:bg-neutral-700/50">
                    <td className="px-4 py-3">
                      <div className="text-white">{order.name || '—'}</div>
                      <div className="text-xs text-gray-500">{order.email || '—'}</div>
                      {order.phone && <div className="text-xs text-gray-500">{order.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      {formatDate(order.preferred_date)} · {formatTime(order.preferred_time)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      {order.hairstyle || '—'}
                      {order.notes && (
                        <div className="mt-0.5 max-w-[160px] truncate text-xs text-gray-500" title={order.notes}>
                          {order.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as AdminOrder['status'])}
                        disabled={updatingId === order.id}
                        className="rounded border border-amber-500/20 bg-neutral-900 px-2 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500 disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                      {updatingId === order.id && <span className="ml-1 text-xs text-gray-500">Saving…</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {order.status === 'complete' ? (
                        <button
                          type="button"
                          onClick={() => handleDelete(order.id)}
                          disabled={deletingId === order.id}
                          className="rounded border border-red-500/30 px-2 py-1 text-xs font-medium text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                        >
                          {deletingId === order.id ? 'Deleting…' : 'Delete'}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500">Delete when complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
