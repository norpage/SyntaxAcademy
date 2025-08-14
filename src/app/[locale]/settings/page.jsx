'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import api from '@/config/axios';
import { API_URLS } from '@/config/urls';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Accordion from '@/components/Accordion';
import DateOfBirthPicker from '@/components/DateOfBirthPicker';

// ---------- helpers ----------
const calcAgeFromISO = (iso) => {
  const b = new Date(iso);
  const t = new Date();
  let age = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
  return age;
};
const isoToDMY = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`; // DD/MM/YYYY
};

// ------- Validation (edit profile) -------
const profileSchema = yup
  .object({
    name: yup.string().min(2, 'Too short').required('Name is required'),
    dob: yup
      .string()
      .nullable()
      .optional()
      .test('valid-date', 'Invalid date', (v) => !v || !Number.isNaN(new Date(v).getTime()))
      .test('age-range', 'Invalid age', (v) => {
        if (!v) return true;
        const a = calcAgeFromISO(v);
        return a >= 1 && a <= 120;
      }),
    image: yup.string().url('Must be a URL').nullable().optional(),
    bio: yup.string().max(500, 'Max 500 chars').nullable().optional(),
  })
  .required();

// ------- Validation (change password) -------
const pwdSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'At least 8 chars')
    .matches(/[A-Z]/, 'Needs an uppercase letter')
    .matches(/[0-9]/, 'Needs a number')
    .matches(/[!@#$%^&*]/, 'Needs a special char')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [serverMsg, setServerMsg] = useState('');

  // Profile form (JSX — առանց generic-ների)
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors: pErrors, isSubmitting: savingProfile },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: { name: '', dob: '', image: '', bio: '' },
  });

  // Password form
  const {
    register: regPwd,
    handleSubmit: submitPwd,
    reset: resetPwd,
    formState: { errors: pwdErrors, isSubmitting: savingPwd },
  } = useForm({ resolver: yupResolver(pwdSchema) });

  // Load current profile (prefill defaults)
  useEffect(() => {
    if (!session?.accessToken) return;
    setLoadingProfile(true);
    api
      .get(API_URLS.me)
      .then(({ data }) => {
        if (data?.status === 'success') {
          const u = data.user;
          const dob =
            u?.dobISO || (u?.dob ? new Date(u.dob).toISOString().slice(0, 10) : '');

          reset({
            name: u?.name || '',
            dob,
            image: u?.image || '',
            bio: u?.bio || '',
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoadingProfile(false));
  }, [session, reset]);

  // Submit profile
  const onSaveProfile = async (form) => {
    setServerMsg('');
    try {
      const payload = {
        name: form.name,
        bio: form.bio ?? '',
      };
      if (typeof form.image !== 'undefined') payload.image = form.image || null;

      if (form.dob) {
        payload.dob = form.dob; // ISO 'YYYY-MM-DD'
        payload.dobDMY = isoToDMY(form.dob); // 'DD/MM/YYYY'
        payload.age = calcAgeFromISO(form.dob); // եթե backend-ում դեռ պետք է age
      } else {
        payload.dob = null;
        payload.dobDMY = null;
        payload.age = null;
      }

      const { data } = await api.put(API_URLS.updateMe, payload);
      setServerMsg(
        data?.status === 'success' ? 'Profile saved' : data?.message || 'Save failed'
      );
    } catch (e) {
      const msg =
        e?.response?.data?.errors?.map((x) => x.msg).join(', ') ||
        e?.response?.data?.message ||
        'Save failed';
      setServerMsg(msg);
    }
  };

  // Submit password
  const onChangePassword = async (form) => {
    setServerMsg('');
    try {
      await api.put(API_URLS.changePassword, {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setServerMsg('Password updated');
      resetPwd({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (e) {
      const msg =
        e?.response?.data?.errors?.map((x) => x.msg).join(', ') ||
        e?.response?.data?.message ||
        'Update failed';
      setServerMsg(msg);
    }
  };

  if (status === 'loading') return null;
  if (status === 'unauthenticated') return null;

  const dobWatch = watch('dob');

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Account Settings</h1>

      {serverMsg && (
        <div className="rounded bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 px-4 py-3 text-sm">
          {serverMsg}
        </div>
      )}

      {/* Profile */}
      <Accordion title="Profile" defaultOpen>
        {loadingProfile ? (
          <p>Loading…</p>
        ) : (
          <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                {...register('name')}
                className="w-full px-3 py-2 rounded border bg-white dark:bg-black/40"
              />
              {pErrors.name && (
                <p className="text-red-500 text-sm">{pErrors.name.message}</p>
              )}
            </div>

            {/* DOB */}
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DateOfBirthPicker
                  value={field.value || ''}
                  onChange={field.onChange}
                  label="Birth date"
                />
              )}
            />
            {pErrors.dob && (
              <p className="text-red-500 text-sm">{String(pErrors.dob.message)}</p>
            )}

            {/* Preview DD/MM/YYYY */}
            {dobWatch ? (
              <input
                readOnly
                value={isoToDMY(dobWatch)}
                className="mt-2 w-full px-3 py-2 rounded border bg-gray-50 dark:bg-black/30 text-gray-900 dark:text-gray-100"
              />
            ) : null}

            {/* Avatar URL */}
            <div>
              <label className="block text-sm mb-1">Avatar URL</label>
              <input
                {...register('image')}
                placeholder="https://…"
                className="w-full px-3 py-2 rounded border bg-white dark:bg-black/40"
              />
              {pErrors.image && (
                <p className="text-red-500 text-sm">{pErrors.image.message}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm mb-1">Bio</label>
              <textarea
                {...register('bio')}
                rows={4}
                className="w-full px-3 py-2 rounded border bg-white dark:bg-black/40"
              />
              {pErrors.bio && (
                <p className="text-red-500 text-sm">{pErrors.bio.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white disabled:opacity-50"
            >
              {savingProfile ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        )}
      </Accordion>

      {/* Change Password */}
      <Accordion title="Change Password">
        <form onSubmit={submitPwd(onChangePassword)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Current password</label>
            <input
              type="password"
              {...regPwd('currentPassword')}
              className="w-full px-3 py-2 rounded border bg-white dark:bg-black/40"
            />
            {pwdErrors.currentPassword && (
              <p className="text-red-500 text-sm">
                {pwdErrors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">New password</label>
            <input
              type="password"
              {...regPwd('newPassword')}
              className="w-full px-3 py-2 rounded border bg-white dark:bg-black/40"
            />
            {pwdErrors.newPassword && (
              <p className="text-red-500 text-sm">{pwdErrors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <input
              type="password"
              {...regPwd('confirmPassword')}
              className="w-full px-3 py-2 rounded border bg-white dark:bg-black/40"
            />
            {pwdErrors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {pwdErrors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={savingPwd}
            className="px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white disabled:opacity-50"
          >
            {savingPwd ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </Accordion>
    </main>
  );
}
