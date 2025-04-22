import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, updateProfile } from '../../api/user'
import './ProfilePage.css'

const Avatar = ({ url, name, size = 'lg' }) => {
  const sizeClass = `avatar-${size}`

  return url ? (
    <img
      src={url}
      alt={name || 'User avatar'}
      className={`avatar ${sizeClass}`}
    />
  ) : (
    <div className={`avatar ${sizeClass} avatar-placeholder`}>
      {name?.charAt(0).toUpperCase() || 'U'}
    </div>
  )
}

const ProfilePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const initialProfileState = {
    id: null,
    fullName: '',
    email: '',
    phone: '',
    address: '',
    avatarUrl: '',
    avatar: null,
  }

  const [profile, setProfile] = useState(initialProfileState)
  const [editableProfile, setEditableProfile] = useState(initialProfileState)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await getUserProfile()
      const data = response.data || response

      const loadedProfile = {
        id: data.id || null,
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        avatarUrl: data.avatarUrl || '',
        avatar: null,
      }

      setProfile(loadedProfile)
      setEditableProfile(loadedProfile)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setApiError(t('profile.fetch_error'))
      if (error.response?.status === 401) {
        navigate('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }, [t, navigate])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setEditableProfile((prev) => ({ ...prev, [name]: value }))
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    },
    [errors]
  )

  const handleFileChange = useCallback((e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      const previewUrl = URL.createObjectURL(file)
      setEditableProfile((prev) => ({
        ...prev,
        avatar: file,
        avatarUrl: previewUrl,
      }))
    }
  }, [])

  const validateForm = useCallback(() => {
    const newErrors = {}
    if (!editableProfile.fullName.trim()) {
      newErrors.fullName = t('profile.errors.fullName_required')
    }
    if (!editableProfile.email.trim()) {
      newErrors.email = t('profile.errors.email_required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editableProfile.email)) {
      newErrors.email = t('profile.errors.email_invalid')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [editableProfile, t])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setApiError('')
      setSuccessMessage('')
      if (!validateForm()) return

      setIsLoading(true)
      try {
        // Tạo object dữ liệu đúng chuẩn với UserDto
        const updatedUser = {
          id: profile.id, // Lấy id từ profile hiện tại
          fullName: editableProfile.fullName,
          email: profile.email, // Giữ nguyên email từ profile gốc (không dùng editable email)
          phone: editableProfile.phone || '',
          address: editableProfile.address || '',
          avatarUrl: editableProfile.avatarUrl, // Giữ nguyên avatarUrl nếu không thay đổi
        }

        // Gửi dữ liệu profile dưới dạng JSON
        await updateProfile(updatedUser)

        // Nếu có avatar mới, upload riêng
        if (editableProfile.avatar) {
          const formData = new FormData()
          formData.append('avatar', editableProfile.avatar)
          const avatarResponse = await updateProfile(formData)
          updatedUser.avatarUrl =
            avatarResponse.data?.avatarUrl || editableProfile.avatarUrl
        }

        // Cập nhật state với dữ liệu mới
        setProfile(updatedUser)
        setIsEditing(false)
        setSuccessMessage(t('profile.update_success'))
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (error) {
        console.error('Error updating profile:', error)
        setApiError(
          t('profile.update_error') + (error.response?.data?.message || '')
        )
        if (error.response?.status === 401) {
          navigate('/login')
        }
      } finally {
        setIsLoading(false)
      }
    },
    [profile, editableProfile, validateForm, t, navigate]
  )

  const handleCancel = () => {
    setEditableProfile(profile)
    setIsEditing(false)
    setErrors({})
  }

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>{t('loading')}</p>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <h1>{t('profile.title')}</h1>
        </div>

        {apiError && <div className="alert alert-error">{apiError}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <div className="profile-content">
          {isEditing ? (
            <ProfileEditForm
              profile={editableProfile}
              errors={errors}
              isLoading={isLoading}
              onChange={handleChange}
              onFileChange={handleFileChange}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              t={t}
            />
          ) : (
            <ProfileView profile={profile} t={t} />
          )}
        </div>

        {!isEditing && (
          <div className="profile-footer">
            <button
              className="btn-edit"
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            >
              {t('profile.edit_button')}
            </button>
            <button
              className="btn-back"
              onClick={() => navigate('/')}
              disabled={isLoading}
            >
              {t('profile.back_to_home')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const ProfileEditForm = ({
  profile,
  errors,
  isLoading,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  t,
}) => (
  <form className="profile-form" onSubmit={onSubmit}>
    <div className="avatar-upload-section">
      <Avatar url={profile.avatarUrl} name={profile.fullName} />
      <label className="avatar-upload-btn">
        {t('profile.avatar')}
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden-input"
        />
      </label>
    </div>

    <div className="form-grid">
      <FormField
        label={t('profile.full_name')}
        name="fullName"
        value={profile.fullName}
        onChange={onChange}
        error={errors.fullName}
        type="text"
        required
      />

      <FormField
        label={t('profile.email')}
        name="email"
        value={profile.email}
        onChange={onChange}
        error={errors.email}
        type="email"
        readOnly
      />

      <FormField
        label={t('profile.phone')}
        name="phone"
        value={profile.phone}
        onChange={onChange}
        type="tel"
      />

      <FormField
        label={t('profile.address')}
        name="address"
        value={profile.address}
        onChange={onChange}
        type="text"
      />
    </div>

    <div className="form-actions">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onCancel}
        disabled={isLoading}
      >
        {t('profile.cancel_button')}
      </button>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? (
          <span className="btn-loader"></span>
        ) : (
          t('profile.save_button')
        )}
      </button>
    </div>
  </form>
)

const ProfileView = ({ profile, t }) => (
  <div className="profile-view">
    <div className="profile-avatar-section">
      <Avatar url={profile.avatarUrl} name={profile.fullName} size="xl" />
      <h2>{profile.fullName}</h2>
    </div>

    <div className="profile-details">
      <DetailItem
        icon="email"
        label={t('profile.email')}
        value={profile.email}
      />

      {profile.phone && (
        <DetailItem
          icon="phone"
          label={t('profile.phone')}
          value={profile.phone}
        />
      )}

      {profile.address && (
        <DetailItem
          icon="location"
          label={t('profile.address')}
          value={profile.address}
        />
      )}
    </div>
  </div>
)

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  required = false,
  ...props
}) => (
  <div className={`form-field ${error ? 'has-error' : ''}`}>
    <label htmlFor={name}>
      {label}
      {required && <span className="required">*</span>}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
)

const DetailItem = ({ icon, label, value }) => (
  <div className="detail-item">
    <div className="detail-content">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value || '-'}</span>
    </div>
  </div>
)

export default ProfilePage
