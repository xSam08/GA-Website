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

// Import RecaptchaModule from ng-recaptcha
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

// Import TranslateModule from ngx-translate
import { TranslateModule } from '@ngx-translate/core';

// Import ToastrService from ngx-toastr
import { ToastrService } from 'ngx-toastr';

// Import LanguageService from the services
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    TranslateModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

/**
 * Contact component that allows users to send messages via a form.
 * Implements field validation, reCAPTCHA, and email sending using EmailJS.
 * Also uses ngx-translate for message translation and ngx-toastr for notifications.
 *
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class ContactComponent {

  // Declaration of different properties
  contactForm: FormGroup;
  siteKey = environment.recaptcha.siteKey;
  captchaResolved: boolean = false;
  lang: 'es' | 'en';

  // Translations for the toastr messages
  private translations = {
    es: {
      mailNotSent: 'Error al enviar el email',
      mailSent: 'Email enviado correctamente',
      success: 'Éxito'
    },
    en: {
      mailNotSent: 'Error sending the email',
      mailSent: 'Email sent correctly',
      success: 'Success'
    }
  };


  /**
   * Constructor for the component
   * Get the current language and create the form
   * @param fb - FormBuilder to create the form
   * @param toastr - ToastrService to show notifications
   * @param languageService - LanguageService to get the current language
   */
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private languageService: LanguageService
  ) {
    const storedLang = this.languageService.getCurrentLang();
    this.lang = storedLang === 'en' ? 'en' : 'es';

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

  
  /**
   * Method that will be called when the captcha is resolved
   * It sets the flag to true and sets the value of the recaptcha field
   * @param captchaResponse - Response from the captcha
   * @returns void
   */
  onCaptchaResolved(captchaResponse: string | null): void {
    if (captchaResponse) {
      this.captchaResolved = true;
      this.contactForm.patchValue({ recaptcha: captchaResponse });
    }
  }  


  /**
   * Method that will be called when the form is submitted
   * It sends the email using EmailJS
   * @returns void
   */
  onSubmit(): void {
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
        this.toastr.success(
          this.translations[this.lang].mailSent,
          this.translations[this.lang].success
        );
      })
      .catch(error => {
        this.toastr.error(this.translations[this.lang].mailNotSent, 'Error');
      });
    }
  }
}
