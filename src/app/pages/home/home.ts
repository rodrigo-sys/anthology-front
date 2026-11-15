import { Component, DestroyRef, Injector, afterNextRender, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';

type Acceso = 'login' | 'registro';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  authService = inject(AuthService);

  acceso = signal<Acceso | null>(null);
  enviando = signal(false);
  loginError = signal('');
  registerError = signal('');

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  readonly pasos = [
    {
      titulo: 'Buscá la canción',
      texto: 'Por título, artista o género, dentro del catálogo.'
    },
    {
      titulo: 'Elegí la versión',
      texto: 'Guitarra, bajo o piano: la que necesitás tocar.'
    },
    {
      titulo: 'Abrí la partitura',
      texto: 'Se abre el PDF para leer, imprimir o estudiar.'
    }
  ];

  readonly extras = [
    {
      kicker: 'Comunidad',
      titulo: 'Comentá cada versión',
      texto: 'Dejá dudas o correcciones y leé cómo otros resolvieron la misma partitura.'
    },
    {
      kicker: 'Catálogo',
      titulo: 'Sugerí una canción',
      texto: 'Si falta la que buscás, sugerila desde tu cuenta y el equipo la revisa.'
    },
    {
      kicker: 'Artistas',
      titulo: 'Subí tu versión',
      texto: 'Si sos artista, cargá tu partitura para guitarra, bajo o piano.'
    }
  ];

  constructor() {
    effect(() => {
      document.body.style.overflow = this.acceso() ? 'hidden' : '';
    });

    this.destroyRef.onDestroy(() => {
      document.body.style.overflow = '';
    });

    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const acceso = params.get('acceso');
        const modo = acceso === 'login' || acceso === 'registro' ? acceso : null;
        this.acceso.set(modo);
        if (modo) this.enfocarModal();
      });
  }

  abrir(modo: Acceso) {
    this.acceso.set(modo);
    this.loginError.set('');
    this.registerError.set('');
    this.router.navigate([], { queryParams: { acceso: modo }, replaceUrl: true });
    this.enfocarModal();
  }

  private enfocarModal() {
    afterNextRender(
      () => document.querySelector<HTMLInputElement>('.modal input')?.focus(),
      { injector: this.injector }
    );
  }

  cerrar() {
    this.acceso.set(null);
    this.router.navigate([], { queryParams: {}, replaceUrl: true });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.enviando.set(true);
    this.loginError.set('');

    const { username, password } = this.loginForm.getRawValue();

    this.authService.login({ username, password }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.router.navigate(['/songs']);
      },
      error: (err) => {
        this.enviando.set(false);
        this.loginError.set(this.mensajeError(err, 'Credenciales inválidas'));
      }
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    this.enviando.set(true);
    this.registerError.set('');

    const { username, email, password } = this.registerForm.getRawValue();

    this.authService.register({ username, email, password }).subscribe({
      next: () => {
        this.authService.login({ username, password }).subscribe({
          next: () => {
            this.enviando.set(false);
            this.router.navigate(['/songs']);
          },
          error: () => {
            this.enviando.set(false);
            this.abrir('login');
            this.loginError.set('Usuario creado. Ya podés iniciar sesión.');
          }
        });
      },
      error: (err) => {
        this.enviando.set(false);
        this.registerError.set(this.mensajeError(err, 'No se pudo crear el usuario'));
      }
    });
  }

  private mensajeError(httpError: any, porDefecto: string) {
    const mensaje = httpError?.error?.message;
    if (mensaje) return mensaje;
    if (httpError?.status === 409) return 'Ese usuario o email ya existe.';
    if (httpError?.status === 401) return 'Credenciales inválidas.';
    return porDefecto;
  }
}
