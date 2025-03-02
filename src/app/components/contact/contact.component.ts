// Import Angular modules
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { 
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

// Import environment
import { environment } from '../../../environments/environment';

// Import EmailJS library
import emailjs from '@emailjs/browser';

// Import RecaptchaModule
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RecaptchaModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})



export class ContactComponent {

  contactForm: FormGroup;
  siteKey = environment.recaptcha.siteKey;
  captchaResolved: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: [
        '', [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      secondName: [
        '', [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      email: [
        '', [
          Validators.required,
          Validators.email
        ]
      ],
      subject: [
        '', [
          Validators.required,
          Validators.minLength(10)
        ]
      ],
      message: [
        '', [
          Validators.required,
          Validators.minLength(30)
        ]
      ],
      recaptcha: ['', Validators.required]
    });
  }

  // Method that will be called when the captcha is resolved
  onCaptchaResolved(captchaResponse: string | null) {
    if (captchaResponse) {
      this.captchaResolved = true;
      this.contactForm.patchValue({ recaptcha: captchaResponse });
    }
  }  

  onSubmit() {
    if (this.contactForm.valid && this.captchaResolved) {
      const formData = {
        from_name: this.contactForm.value.firstName + ' ' + this.contactForm.value.secondName,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        from_email: this.contactForm.value.email,
        'g-recaptcha-response': this.contactForm.value.recaptcha
      };

      emailjs.send(
        environment.emailJS.serviceID,
        environment.emailJS.templateID,
        formData,
        environment.emailJS.userID
      )
      .then(() => {
        this.contactForm.reset();
        this.captchaResolved = false; // Reset CAPTCHA flag
      })
      .catch(error => {
        console.error('Error al enviar el email', error);
      });
    }
  }
}
