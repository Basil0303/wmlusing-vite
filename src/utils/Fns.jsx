export const handleSubmit = (event, setValidated, fn) => {
    const form = event.currentTarget;
    
    setValidated(true);
  
    event.preventDefault();
  
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return false;
    }

    fn();
    return true
  };
  