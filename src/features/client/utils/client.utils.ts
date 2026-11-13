/**
 * Client-specific utility functions.
 */

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const statusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
  };
  return labels[status] ?? status;
};

export const statusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };
  return colors[status] ?? 'bg-gray-100 text-gray-800';
};

export const validateClientForm = (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
}): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address';
  }
  if (!data.phone.trim()) {
    errors.phone = 'Phone is required';
  }
  if (!data.address.trim()) {
    errors.address = 'Address is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};