const API_BASE_URL = 'http://localhost:8000/api'; 
const apiKey = 'front_plus_back_warn_not';


const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const agreeTermsCheckbox = document.getElementById('agreeTerms');
const agreeOffersCheckbox = document.getElementById('agreeOffers');
const feedbackTextarea = document.getElementById('feedbackText');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const termsError = document.getElementById('termsError');
const offersError = document.getElementById('offersError');
const feedbackTextError = document.getElementById('feedbackTextError');
const successMessage = document.getElementById('successMessage');

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 

        
            nameError.textContent = '';
            emailError.textContent = '';
            termsError.textContent = '';
            offersError.textContent = '';
            feedbackTextError.textContent = '';
            successMessage.textContent = '';
            feedbackTextarea.textContent = '';

           
            let isValid = true;
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Пожалуйста, введите имя.';
                isValid = false;
            }
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Пожалуйста, введите email.';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                emailError.textContent = 'Пожалуйста, введите корректный email.';
                isValid = false;
            }
            if (!agreeTermsCheckbox.checked) {
                termsError.textContent = 'Пожалуйста, согласитесь с условиями.';
                isValid = false;
            }
            if (feedbackTextarea.value.trim() && feedbackTextarea.value.trim().length > 500) { 
                feedbackTextError.textContent = 'Текст обратной связи не должен превышать 500 символов.';
                isValid = false;
            }

            if (!isValid) {
                return; 
            }

            
            const formData = {
                name: nameInput.value.trim(),
                to: emailInput.value.trim(),
                message: feedbackTextarea.value.trim(),
                agreeOffers: agreeOffersCheckbox.checked,
                feedbackText: feedbackTextarea.value.trim()
            };

            
            try {
                const url = `${API_BASE_URL}/mail/sendMail`;
                const response = await fetch(url, {  
                    method: 'POST',
                    credentials: 'include',  
                    headers: {
                        'X-API-Key': apiKey,  
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(formData),
                });
                console.log(response)

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                successMessage.textContent = data.message || 'Письмо успешно отправлено!'; // Отображаем сообщение об успехе
                
                form.reset();

            } catch (error) {
                console.error('Error:', error);
                successMessage.textContent = ''; 
                alert(`Ошибка отправки письма: ${error.message}`);  
            }
});