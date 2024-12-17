import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { 
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm: FormGroup;

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
      ]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulario válido:', this.contactForm.value);
    }
  }
}
