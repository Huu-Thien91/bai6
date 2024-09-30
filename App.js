import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Format lại số điện thoại khi nhập
  const formatPhoneNumber = (input) => {
    // Xóa tất cả các ký tự không phải là số
    let cleaned = ('' + input).replace(/\D/g, '');
    
    // Chia chuỗi thành từng phần theo định dạng (xxx) xxx-xxxx
    let match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (match) {
      let formattedNumber = `${match[1]}${match[2] ? '-' + match[2] : ''}${match[3] ? '-' + match[3] : ''}`;
      return formattedNumber;
    }
    return input;
  };

  // Khi người dùng nhập liệu
  const handlePhoneChange = (input) => {
    const formattedNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedNumber);
    validatePhoneNumber(formattedNumber);
  };

  // Kiểm tra tính hợp lệ của số điện thoại (VD: phải đủ 10 số)
  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    setIsValid(cleaned.length === 10); // Số điện thoại phải đủ 10 ký tự
  };

  // Khi người dùng nhấn nút "Tiếp tục"
  const handleSubmit = () => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ. Vui lòng nhập lại số điện thoại hợp lệ.');
    } else {
      // Thực hiện logic đăng nhập khi số điện thoại hợp lệ
      console.log("Số điện thoại: ", phoneNumber);
      Alert.alert('Thành công', 'Số điện thoại hợp lệ!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.subtitle}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput
          style={[styles.input, !isValid && styles.inputError]}
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          keyboardType="numeric"
          placeholder="Nhập số điện thoại của bạn"
          maxLength={12} // Định dạng số tối đa với 10 số và 2 dấu gạch
        />
        {!isValid && <Text style={styles.errorText}>Số điện thoại không hợp lệ</Text>}

        <View style={styles.buttonContainer}>
          <Button title="Tiếp tục" onPress={handleSubmit} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default App;
