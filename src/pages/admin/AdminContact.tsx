import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { getAdminContacts, deleteContact as deleteContactApi, type AdminContact } from '../../lib/api';

function formatDate(d: string | undefined): string {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return String(d);
  }
}

export default function AdminContact() {
  const [contacts, setContacts] = useState<AdminContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await getAdminContacts();
    if (res.success && res.data) setContacts(res.data);
    else setError(res.error ?? 'Failed to load contacts');
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this contact submission?')) return;
    setDeletingId(id);
    setError(null);
    const res = await deleteContactApi(id);
    if (res.success) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } else {
      setError(res.error ?? 'Delete failed');
    }
    setDeletingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Contact submissions</h1>
          <p className="mt-1 text-sm text-gray-400">All messages from the contact form.</p>
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

      {loading && contacts.length === 0 ? (
        <div className="rounded-xl border border-amber-500/20 bg-neutral-800 p-12 text-center text-gray-400">
          Loading contacts…
        </div>
      ) : contacts.length === 0 ? (
        <div className="rounded-xl border border-amber-500/20 bg-neutral-800 p-12 text-center text-gray-400">
          No contact submissions yet.
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-amber-500/20 bg-neutral-800 p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-white">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.phone || c.email || '—'}</p>
                  {c.subject && (
                    <p className="mt-1 text-sm font-medium text-amber-500/90">{c.subject}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500 whitespace-nowrap">{formatDate(c.created_at)}</p>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingId === c.id}
                    className="rounded-lg p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    title="Delete"
                    aria-label="Delete contact"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-300 whitespace-pre-wrap">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
