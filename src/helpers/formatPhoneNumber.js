export const formatPhoneNumber = (phoneNumber) => {
    // Validar que el número sea de 10 dígitos
    if (!/^\d{10}$/.test(phoneNumber)) {
      return phoneNumber; // Si no cumple la validación, regresa el número original
    }
  
    // Desglosar el número en partes
    const areaCode = phoneNumber.slice(0, 3);
    const centralOfficeCode = phoneNumber.slice(3, 6);
    const lineNumber = phoneNumber.slice(6);
  
    // Formatear el número
    return `+1 (${areaCode}) ${centralOfficeCode}-${lineNumber}`;
  }