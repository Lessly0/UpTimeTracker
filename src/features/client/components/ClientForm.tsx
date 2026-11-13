import { useState } from 'react';
import { ClientFormData } from '../types/client.types';
import { validateClientForm } from '../utils/client.utils';

interface ClientFormProps {
  initialData?: ClientFormData;
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ClientForm = ({ initialData, onSubmit, onCancel, loading }: ClientFormProps) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: initialData?.name ?? '',
    email: initialData?.email ?? '',
    phone: initialData?.phone ?? '',
    address: initialData?.address ?? '',
    status: initialData?.status ?? 'active',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateClientForm(formData);
    setErrors(validationErrors);
    if (valid) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`mt-1 block w-full pl-3 pr-3 py-2 border leading-5 bg-white placeholder-gray-500 focus:outline-none focus:sm:text-sm focus:ring-1 ${
            errors.name
              ? 'focus:ring-red-500 focus:border-red-500 border-red-300'
              : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          } sm:text-sm rounded-md`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`mt-1 block w-full pl-3 pr-3 py-2 border leading-5 bg-white placeholder-gray-500 focus:outline-none focus:sm:text-sm focus:ring-1 ${
            errors.email
              ? 'focus:ring-red-500 focus:border-red-500 border-red-300'
              : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          } sm:text-sm rounded-md`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`mt-1 block w-full pl-3 pr-3 py-2 border leading-5 bg-white placeholder-gray-500 focus:outline-none focus:sm:text-sm focus:ring-1 ${
            errors.phone
              ? 'focus:ring-red-500 focus:border-red-500 border-red-300'
              : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          } sm:text-sm rounded-md`}
          placeholder="+1-555-0100"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={`mt-1 block w-full pl-3 pr-3 py-2 border leading-5 bg-white placeholder-gray-500 focus:outline-none focus:sm:text-sm focus:ring-1 ${
            errors.address
              ? 'focus:ring-red-500 focus:border-red-500 border-red-300'
              : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          } sm:text-sm rounded-md`}
          placeholder="123 Main St, City, State"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:sm:text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 sm:text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Client'}
        </button>
      </div>
    </form>
  );
};