import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}) => {
  const baseStyles = 'rounded-2xl items-center justify-center flex-row';

  const variantStyles = {
    primary: 'bg-indigo-600 active:bg-indigo-700',
    secondary: 'bg-gray-200 active:bg-gray-300',
    outline: 'bg-transparent border-2 border-indigo-600',
    ghost: 'bg-transparent',
  };

  const textVariantStyles = {
    primary: 'text-white font-semibold',
    secondary: 'text-gray-800 font-semibold',
    outline: 'text-indigo-600 font-semibold',
    ghost: 'text-indigo-600 font-medium',
  };

  const sizeStyles = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50' : '';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${widthStyles}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#ffffff' : '#4F46E5'}
          size="small"
        />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && <View>{icon}</View>}
          <Text className={`${textVariantStyles[variant]} ${textSizeStyles[size]}`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
