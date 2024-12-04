<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import '../../../firebase/config.js';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    const correo = ref('');
    const clave = ref('');
    const error = ref<string | null>(null);
    const router = useRouter();

    const entradaUsuario = async () => {
        error.value = null;
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, correo.value, clave.value);
            router.push({ name: 'personal' });
        } catch (err) {
            switch ((err as any).code) {
                case 'auth/user-not-found':
                    error.value = 'Usuario no encontrado';
                    break;
                case 'auth/wrong-password':
                    error.value = "Contraseña incorrecta";
                    break;
                default:
                    error.value = "Error al iniciar sesión";
                    break;
            }
        }
    }

    
</script>

<template>
    <div class="container mt-5">
        <form class="card shadow w-50 mx-auto" @submit.prevent="entradaUsuario">
            <h2 class="card-header text-center">Login</h2>
            <div class="card-body">
                <div class="alert alert-danger text-center" v-if="error">
                    {{ error }} 
                </div>
                <div class="mb-3">
                    <label class="form-label">Correo:</label>
                    <input type="email" class="form-control" v-model="correo" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" v-model="clave" required>
                    <span class="fs-6 text-secondary fw-lighter" style="cursor: pointer" @click="router.push('/registrar')">
                    No tienes cuenta? <a href="">Regístrate aquí</a>
                    </span>
                </div>

                <button type="submit" class="btn btn-primary w-100">
                    Entrar
                </button>
            </div>
        </form>
    </div>
    
</template>
